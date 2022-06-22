<template>
  <a-form
    class="px-5"
    :model="owner"
    name="owner"
    autocomplete="off"
    id="owner"
    :hideRequiredMark="true"
    @finish="changeOwner"
    layout="vertical"
  >
    <a-form-item
      label="User"
      name="selected"
      class="grow"
      :rules="[{ required: true, message: 'Please Select User' }]"
    >
      <a-select
        v-model:value="owner.selected"
        class="w-full"
        :loading="fetchUsers"
        :options="users"
      ></a-select>
    </a-form-item>
    <a-form-item
      label="New User"
      name="newUser"
      v-if="owner.selected == 'createNewUser'"
      :rules="[{ required: true, message: 'Enter New User' }]"
    >
      <a-input
        type="text"
        id="newUrl"
        class="p-2 border border-gray-600 rounded"
        v-model:value="owner.newUser"
      ></a-input>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      owner: {
        selected: "",
        newUser: "",
      },
      fetchUsers: false,
      users: [{ value: "createNewUser", label: "Create New User" }],
    };
  },
  created() {
    this.fetchUsers = true;
    this.$axios
      .get("/server/" + this.$store.state.currentSite.serverId + "/users")
      .then((res) => {
        for (let user of res.data) {
          this.users.push({ value: user.user, label: user.user });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.fetchUsers = false;
  },
  methods: {
    changeOwner() {
      let user =
        this.owner.selected != "createNewUser"
          ? this.owner.selected
          : this.owner.newUser;
      this.$axios
        .post("/site/" + this.$route.params.siteid + "/changeOwner", {
          user: user,
        })
        .then((res) => {
          this.$store.commit("setCurrentSite", res.data);
          this.$toast.success("Changed site ownership");
          this.$emit("close");
        })
        .catch(() => {
          this.$toast.error("Failed to change site ownership");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
