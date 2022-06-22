<template>
  <div>
    <div>
      <p class="mb-5">
        Here you can view current active SSH sessions and there details. You can
        terminate any unknown session.
      </p>
      <div>
        <DataTable
          :value="session"
          class="p-datatable-lg -mx-5 -mb-5"
          :rowHover="true"
          dataKey="index"
        >
          <template #empty>
            <div class="">No Active SSH Session</div>
          </template>

          <Column field="user" header="User"> </Column>
          <Column field="ip" header="IP Address"> </Column>
          <Column field="login" header="Login Since"> </Column>
          <Column field="ideal" header="Ideal Time"> </Column>
          <Column field="process" header="Current Process"> </Column
          ><Column class="w-5 relative">
            <template #body="{ data }">
              <a-popconfirm
                placement="topRight"
                title="Are you sure to logout this user?"
                ok-text="Logout"
                cancel-text="No"
                @confirm="killSession(data)"
              >
                <div
                  class="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-2 rounded-full hover:bg-white cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-red-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
              </a-popconfirm>
            </template>
          </Column>
        </DataTable>
      </div>
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
      session: [],
    };
  },
  created() {
    this.$axios
      .get("/server/" + this.$route.params.serverid + "/ssh/users")
      .then((res) => {
        this.session = res.data;
      })
      .catch(() => {
        this.$toast.error("Failed to fetch SSH session");
      });
  },
  methods: {
    killSession(data) {
      return this.$axios
        .post("/server/" + this.$route.params.serverid + "/ssh/kill", {
          id: data.id,
        })
        .then((res) => {
          this.session = res.data;
          this.$toast.success("SSH Session killed");
        })
        .catch(() => {
          this.$toast.error("Failed to kill SSH Session");
        });
    },
  },
};
</script>

<style></style>
