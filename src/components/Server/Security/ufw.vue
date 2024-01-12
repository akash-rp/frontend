<template>
  <a-modal title="Add Firewall Rule" v-model:visible="showAddRule">
    <template #footer>
      <button
        class="py-2 px-4 font-medium border border-black rounded"
        @click="showAddRule = false"
      >
        Cancel
      </button>
      <button
        class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
        @click="$refs.addRule.addRule()"
      >
        Add Rule
      </button>
    </template>
    <add-rule
      ref="addRule"
      @close="showAddRule = false"
      @ufw="modifyUfw"
    ></add-rule>
  </a-modal>
  <div>
    <div class="mb-5 flex flex-row justify-between">
      <p>
        The firewall is powered by UFW. Only specified ports allow inbound
        connections. All other traffic will be dropped.
      </p>
      <Button label="Add Rule" @click="showAddRule = true"></Button>
    </div>
    <DataTable
      :value="simpleUfw"
      class="p-datatable-lg -mx-5 -mb-5"
      :rowHover="true"
      dataKey="index"
    >
      <template #loading> Loading records, please wait... </template>
      <template #empty>
        <div class="">"No Rules Found"</div>
      </template>

      <Column field="To_ports" header="Port">
        <template #body="{ data }">
          {{ displayPort(data) }}
        </template>
      </Column>
      <Column field="Action" header="Action">
        <template #body="{ data }">
          <tag v-if="data.Action == 'ALLOW'">Allow</tag>
          <tag v-if="data.Action == 'REJECT'" severity="warning">Reject</tag>
        </template>
      </Column>
      <Column field="From_ip" header="IP Address">
        <template #body="{ data }">
          <a-tag
            v-if="
              data.Network_protocol == 'Any' ||
              (data.Network_protocol == 'ipv4' && data.From_ip == 'Any')
            "
            >All IPv4</a-tag
          >
          <a-tag
            v-if="
              data.Network_protocol == 'Any' ||
              (data.Network_protocol == 'ipv6' && data.From_ip == 'Any')
            "
            >All IPv6</a-tag
          >
          <div v-if="data.From_ip !== 'Any'">
            {{ displayFrom(data) }}
          </div>
        </template>
      </Column>
      <Column field="To_transport" header="Protocol">
        <template #body="{ data }">
          <a-tag v-if="data.To_transport === 'any'">TCP</a-tag>
          <a-tag v-if="data.To_transport === 'any'">UDP</a-tag>
          <a-tag v-if="data.To_transport === 'tcp'">TCP</a-tag>
          <a-tag v-if="data.To_transport === 'udp'">UDP</a-tag>
        </template>
      </Column>
      <Column class="w-5 relative">
        <template #body="{ data }">
          <a-popconfirm
            placement="topRight"
            title="Are you sure to delete this rule?"
            ok-text="Delete"
            cancel-text="No"
            @confirm="deleteRule(data)"
          >
            <div
              class="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-2 rounded-full hover:bg-white cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-red-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </a-popconfirm>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import AddUfwRule from "./AddUfwRule.vue";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import _isEqual from "lodash/isEqual";
import _some from "lodash/some";
import _omit from "lodash/omit";
import _update from "lodash/update";

export default {
  components: { DataTable, Column, Tag, Button, addRule: AddUfwRule },
  data() {
    return {
      ufw: "",
      simpleUfw: [],
      showAddRule: false,
    };
  },

  created() {
    this.$axios
      .get("server/" + this.$route.params.serverid + "/ufw")
      .then((res) => {
        this.ufw = res.data;
        this.modifyUfw(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    deleteRule(data) {
      if (typeof data.Index == "number") {
        var index = [data.Index];
      } else {
        var index = data.Index;
      }
      this.$axios
        .delete("/server/" + this.$route.params.serverid + "/ufw", {
          index: index,
        })
        .then((res) => {
          this.ufw = res.data;
          this.modifyUfw(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    displayPort(data) {
      if (data.To_ports) {
        return data.To_ports[0];
      } else if (data.To_port_ranges) {
        if (
          data.To_port_ranges[0].Start == 0 &&
          data.To_port_ranges[0].End == 65535
        ) {
          return "Anywhere";
        }
        return (
          data.To_port_ranges[0].Start + " - " + data.To_port_ranges[0].End
        );
      }
    },
    displayFrom(data) {
      if (data.From_ip == "0.0.0.0") {
        return "All IPv4";
      } else if (data.From_ip == "::") {
        return "All IPv6";
      } else {
        return data.From_ip;
      }
    },
    modifyUfw(data) {
      let rules = data.Rules;
      let modifiedRules = [];
      function changeip(ip) {
        if (ip == "0.0.0.0" || ip == "::") {
          return "Any";
        } else {
          return ip;
        }
      }
      for (let i = 0; i < rules.length; i++) {
        let check = _some(modifiedRules, (rule) => {
          _update(rule, "From_ip", function (ip) {
            return changeip(ip);
          });
          _update(rules[i], "From_ip", function (ip) {
            return changeip(ip);
          });
          let result = _isEqual(
            _omit(rule, ["Network_protocol", "Index"]),
            _omit(rules[i], ["Network_protocol", "Index"])
          );
          if (result) {
            if (rule.Network_protocol !== rules[i].Network_protocol) {
              _update(rule, "Network_protocol", () => "Any");
              _update(rule, "Index", () => {
                return [rule.Index, rules[i].Index];
              });
            }
          }
          return result;
        });
        // console.log("Check:", check);
        if (!check) {
          modifiedRules.push(rules[i]);
        }
      }
      this.simpleUfw = modifiedRules;
      this.showAddRule = false;
    },
  },
};
</script>

<style></style>
