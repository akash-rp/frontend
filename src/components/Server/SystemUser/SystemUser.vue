<template>
  <div class="w-full rounded shadow bg-white">
    <a-modal
      title="Change User Password"
      v-model:visible="showChangePassword"
      :destroyOnClose="true"
    >
      <template #footer>
        <button
          class="py-2 px-4 font-medium border border-black rounded"
          @click="showChangePassword = false"
        >
          Cancel
        </button>
        <button
          class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
          type="submit"
          form="changePass"
          html-type="submit"
        >
          Submit
        </button>
      </template>
      <ChangePassword
        :user="user"
        ref="changePassword"
        @submit="changePasswordMethod"
      >
      </ChangePassword>
    </a-modal>
    <h1 class="header">System Users</h1>
    <div class="">
      <DataTable
        :value="users"
        class="p-datatable-lg"
        :rowHover="true"
        dataKey="index"
        :rowClass="addVld"
      >
        <template #empty>
          <div class="">No Users found</div>
        </template>

        <Column header="User" field="user" class=""> </Column>
        <Column header="Change Password" class="">
          <template #body="{ data }">
            <div class="flex w-32 justify-center relative">
              <div
                class="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-2 rounded-full hover:bg-white cursor-pointer"
                @click="showChangePasswordModal(data)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-indigo-700 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>
          </template>
        </Column>
        <Column class="w-5 relative">
          <template #body="{ data }">
            <a-popconfirm
              v-if="data.sites == 0 && data.user != 'root'"
              placement="topRight"
              title="Are you sure to delete this user?"
              ok-text="Delete"
              cancel-text="No"
              @confirm="deleteUser(data)"
              :disabled="data.sites > 0"
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
            <a-tooltip
              placement="left"
              :mouseEnterDelay="0.2"
              :mouseLeaveDelay="0.5"
              v-if="data.sites > 0"
            >
              <template #title
                >Cannot delete user as it has one or more sites.</template
              >
              <div
                class="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-2 rounded-full hover:bg-white cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
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
            </a-tooltip>
          </template>
        </Column>
        <Column class="w-0 p-0">
          <template #body="data">
            <Loading
              class=""
              :active="loader[data.data.user]"
              :is-full-page="false"
              :height="40"
              :width="40"
              color="#4f46e5"
              :z-index="1000"
              loader="dots"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ChangePassword from "./ChangePassword.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    DataTable,
    Column,
    ChangePassword,
    ChangePassword,
    Loading,
  },
  data() {
    return {
      users: [],
      showChangePassword: false,
      user: { user: "" },
      loader: {},
    };
  },
  created() {
    this.$axios
      .get("/server/" + this.$route.params.serverid + "/users")
      .then((res) => {
        this.users = res.data;
      })
      .catch(() => {
        this.$toast.error("Failed to get system users");
      });
  },
  methods: {
    showChangePasswordModal(data) {
      this.user.user = data.user;
      this.showChangePassword = true;
    },
    changePasswordMethod(data) {
      console.log("Inside Submit method");
      console.log(data);
      this.showChangePassword = false;
      this.loader[data.user] = true;

      this.$axios
        .patch(
          "/server/" + this.$route.params.serverid + "/users",
          {
            user: data.user,
            password: data.password,
          }
        )
        .then(() => {
          this.$toast.success("Changed password for user " + data.user);
        })
        .catch(() => {
          this.$toast.error("Failed to change password for user " + data.user);
        })
        .finally(() => {
          this.loader[data.user] = false;
        });
    },
    addVld(data) {
      return "vld-parent";
    },
    deleteUser(data) {
      console.log(data);
      this.loader[data.user] = true;
      this.$axios
        .delete(
          "/server/" + this.$route.params.serverid + "/users",
          {
            user: data.user,
          },
          {
            Headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.users = res.data;
          this.$toast.success("User " + data.user + " deleted ");
        })
        .catch(() => {
          this.$toast.error("Failed to delete user " + data.user);
        })
        .finally(() => {
          this.loader[data.user] = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
