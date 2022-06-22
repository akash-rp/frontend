<template>
  <div class="flex bg-white flex-col">
    <div class="flex flex-row mb-5 items-center">
      <span class="w-28">From Source</span>
      <a-select
        ref="select"
        v-model:value="ipSource"
        :options="sourceOptions"
        style="width: 180px"
        class="mr-5"
        size="default"
      ></a-select>
    </div>
    <div class="flex flex-row items-center mb-5" v-if="ipSource == 'single'">
      <span class="w-28">IP Address</span>
      <a-input
        v-model:value="singleip"
        placeholder="IPv4/IPv6 Address"
        class="w-44"
      />
    </div>

    <div class="flex flex-row items-center mb-5" v-if="ipSource == 'subnet'">
      <span class="w-28">IP Subnet</span>
      <a-input
        v-model:value="subnet.ip"
        placeholder="IPv4/IPv6"
        style="width: 160px"
      />
      <span class="px-2">/</span>
      <a-input
        v-model:value="subnet.prefix"
        placeholder="24"
        style="width: 50px"
      />
    </div>
    <div class="mb-5 flex flex-row items-center">
      <span class="w-28">To Port</span>
      <a-select
        ref="select"
        v-model:value="port"
        :options="portOptions"
        style="width: 180px"
        class="mr-5"
        size="default"
      ></a-select>
    </div>
    <div class="mb-5 flex flex-row items-center" v-if="port == 'single'">
      <span class="w-28">Port</span>
      <a-input
        v-model:value="portNumber"
        placeholder="80"
        style="width: 50px"
      />
    </div>
    <div class="mb-5 flex flex-row items-center" v-if="port == 'range'">
      <span class="w-28">Port Range</span>
      <a-input
        v-model:value="portRange[0]"
        placeholder="80"
        style="width: 50px"
      />
      <span class="px-2">-</span>
      <a-input
        v-model:value="portRange[1]"
        placeholder="88"
        style="width: 50px"
      />
    </div>
    <div class="flex flex-row items-center mb-5">
      <span class="w-28">Protocol</span>
      <a-select
        ref="select"
        v-model:value="protocol"
        :options="protoOptions"
        style="width: 180px"
        class="mr-5"
      ></a-select>
    </div>
    <div class="flex flex-row items-center">
      <p class="w-28">Action</p>
      <a-radio-group v-model:value="action">
        <a-radio value="allow">Allow</a-radio>
        <a-radio value="reject" @change="selectedPartialDatabase"
          >Reject</a-radio
        >
      </a-radio-group>
    </div>
    <p class="mt-5 text-red-700" v-if="showProtocolError">
      Protocol can be either TCP or UDP for Port Range
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ipSource: "any",
      sourceOptions: [
        { value: "any", label: "All IP Address" },
        { value: "ipv4", label: "All IPv4" },
        { value: "ipv6", label: "All IPv6" },
        { value: "single", label: "Single IP Address" },
        { value: "subnet", label: "IP Subnet" },
      ],
      singleip: "",
      ipRange: [],
      subnet: { ip: "", prefix: "" },
      port: "any",
      portOptions: [
        { value: "any", label: "All Ports" },
        { value: "single", label: "Single Port" },
        { value: "range", label: "Port Range" },
      ],
      portNumber: "",
      portRange: [],
      protocol: "any",
      protoOptions: [
        { value: "any", label: "All" },
        { value: "tcp", label: "TCP" },
        { value: "udp", label: "UDP" },
      ],
      action: "allow",
      showProtocolError: false,
    };
  },
  methods: {
    addRule() {
      if (this.port == "range") {
        if (this.protocol == "any") {
          this.showProtocolError = true;
          return;
        }
      }
      this.showProtocolError = false;
      this.$axios
        .post("/server/" + this.$route.params.serverid + "/ufw/add", {
          source: {
            type: this.ipSource,
            ip: this.singleip,
            range: this.ipRange,
            subnet: this.subnet,
          },
          port: {
            type: this.port,
            number: this.portNumber,
            range: this.portRange,
          },
          protocol: this.protocol,
          action: this.action,
        })
        .then((res) => {
          this.$emit("ufw", res.data);
          this.$toast.success("UFW Rule Added");
        })
        .catch((err) => {
          console.log(err);
          this.$emit("close");
          this.$toast.error("Failed to add rule");
        });
    },
  },
};
</script>
