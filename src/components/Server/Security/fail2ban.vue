<template>
  <div>
    <p>
      Fail2ban is a daemon that can be used to monitor the logs of services and
      ban clients that repeatedly fail authentication checks.
    </p>
    <p class="my-5">
      Here you can see the list of IP's that are banned due to bruteforcing your
      server.
    </p>
    <div>
      <DataTable
        :value="ips"
        class="p-datatable-lg -mx-5 -mb-5"
        :rowHover="true"
        dataKey="index"
      >
        <template #empty>
          <div class="">"No Rules Found"</div>
        </template>

        <Column header="IP Address">
          <template #body="{ data }">
            {{ data }}
          </template>
        </Column>
        <Column class="w-5 relative">
          <template #body="{ data }">
            <a-popconfirm
              placement="topRight"
              title="Are you sure to unban this IP?"
              ok-text="Remove"
              cancel-text="No"
              @confirm="deleteIP(data)"
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
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default {
  components: { DataTable, Column },
  data() {
    return {
      ips: [],
    };
  },
  created() {
    this.$axios
      .get("/server/" + this.$route.params.serverid + "/fail2ban/ip")
      .then((res) => {
        this.ips = res.data;
      })
      .catch(() => {
        this.$toast.error("Failed to get fail2ban banned ips");
      });
  },
  methods: {
    deleteIP(data) {
      return this.$axios.post(
        "/server/" + this.$route.params.serverid + "/fail2ban/unban",
        {
          ip: data,
        }
      ).then((res)=>{
        this.ips= res.data
        this.$toast.success("Removed IP from banned list")
      }).catch(()=>{
        this.$toast.error("Failed to remove IP from banned list")

      })
    },
  },
};
</script>

<style></style>
