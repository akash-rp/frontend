<template>
  <div class="main_bg">
    <header class="header">Staging Site</header>
    <div class="px-5">
      <p>
        This staging site will create a exact copy of live site for
        developement/testing purpose.
      </p>
      <div class="mt-5">
        <div class="flex flex-col">
          <label for="url " class="font-semibold">Domain Name</label>
          <input
            type="text"
            class="input"
            placeholder="Enter url"
            v-model="url"
          />
        </div>
        <div class="mt-5">
          <p for="auth" class="font-semibold">Authentication</p>

          <a-checkbox v-model:checked="auth" id="auth" class="mt-2">
            Enable Auth</a-checkbox
          >
          <div class="flex flex-col mt-2" v-if="auth">
            <label for="auth-user">Username</label>
            <input type="text" id="auth-user" class="input" />
            <label for="auth-password" class="mt-2">Password</label>
            <div class="flex flex-row items-center">
              <password
                v-model="password"
                inputClass="p-1 w-full rounded"
                class="w-1/2"
                :feedback="false"
                showIcon="pi pi-eye"
                toggleMask="true"
              />
            </div>
            <label for="confirm-password" class="mt-2">Confirm Password</label>
            <div class="">
              <password
                v-model="confirmPassword"
                inputClass="p-1 w-full rounded"
                class="w-1/2"
                :feedback="false"
                showIcon="pi pi-eye"
                toggleMask="true"
              />
            </div>
          </div>
        </div>
        <div class="my-5">
          <p class="font-semibold">Search Engine</p>
          <a-checkbox v-model:checked="searchEngine" id="auth" class="mt-2">
            Discourage Search Engine</a-checkbox
          >
        </div>
      </div>
      <div class="mb-5 float-right">
        <Button
          label="Create Staging"
          @click="createStaging"
          :loading="loading['submit']"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Password from "primevue/password";
import Button from "primevue/button";
export default {
  components: { Password, Button },
  data() {
    return {
      url: "",
      auth: false,
      searchEngine: false,
      password: "",
      confirmPassword: "",
      loading: { submit: false },
    };
  },
  methods: {
    createStaging() {
      if (this.url.length == 0) {
        return;
      }
      this.loading.submit = true;
      this.$axios
        .post(
          "http://localhost/site/" +
            this.$store.state.currentSite.siteId +
            "/createstaging",
          {
            url: this.url,
          }
        )
        .then((res) => {
          this.$store.commit("setSites", res.data);
          this.$router.push(
            "/server/" + this.$store.state.currentSite.serverId + "/sites"
          );
          this.$toast.success("Staging site created");
        })
        .catch(() => {
          this.$toast.error("Failed to created staging site");
        })
        .finally(() => {
          this.loading.submit = false;
        });
    },
  },
};
</script>

<style>
.p-input-icon-right > i:last-of-type {
  right: 1.75rem !important;
  color: #71717a;
}
</style>
