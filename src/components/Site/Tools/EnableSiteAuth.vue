<template>
  <div>
    <a-form
      class="px-5"
      :model="site"
      name="siteauth"
      autocomplete="off"
      id="siteauth"
      :hideRequiredMark="true"
      @finish="enableSiteAuth"
      layout="vertical"
    >
      <a-form-item
        label="Username"
        name="username"
        class="grow"
        :rules="[{ required: true, message: 'Please Enter Username' }]"
      >
        <a-input
          type="text"
          id="username"
          class="p-2 border border-gray-600 rounded"
          v-model:value="site.username"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please Enter Password' }]"
      >
        <a-input-password
          type="text"
          id="password"
          class="p-2 border border-gray-600 rounded"
          v-model:value="site.password"
        ></a-input-password>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      site: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    enableSiteAuth() {
      this.$axios
        .post("/site/" + this.$route.params.siteid + "/auth/enable", {
          ...this.site,
        })
        .then((res) => {
          this.$store.commit("setCurrentSite", res.data);
          this.$toast.success("Authentication enabled for site");
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Failed to add authentication");
        })
        .finally(() => {
          this.$emit("close");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
