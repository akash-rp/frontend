<template>
  <div
    class="w-full shadow bg-white rounded"
    v-if="this.$store.state.currentServer?.name"
  >
    <div class="">
      <h1 class="header">Server Name</h1>
      <a-form
        class="px-5"
        :model="rename"
        name="rename"
        autocomplete="off"
        id="rename"
        :hideRequiredMark="true"
        @finish="changeName"
      >
        <div class="flex flex-row">
          <a-form-item
            label=""
            name="name"
            class="grow"
            :rules="[{ required: true, message: 'Name cannot be empty' }]"
          >
            <a-input v-model:value="rename.name" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="ml-5"
              >Update</a-button
            >
          </a-form-item>
        </div>
      </a-form>
    </div>
    <div class="">
      <h1 class="header">Server IP Address</h1>
      <a-form
        class="px-5"
        :model="ip"
        name="changeip"
        autocomplete="off"
        id="changeip"
        :hideRequiredMark="true"
        @finish="changeIp"
      >
        <div class="flex flex-row">
          <a-form-item
            label=""
            name="ip"
            class="grow"
            :rules="[{ required: true, message: 'IP address cannot be empty' }]"
            :validateStatus="fieldErrors['ip'].status"
            :help="fieldErrors['ip'].message"
          >
            <a-input v-model:value="ip.ip" @change="enableIpUpdate" />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="ml-5"
              :disabled="!ipChanged"
              >Update</a-button
            >
          </a-form-item>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      rename: { name: "" },
      ip: { ip: "" },
      ipChanged: false,
      fieldErrors: {
        ip: {
          status: undefined,
          message: undefined,
        },
      },
    };
  },

  watch: {
    "$store.state.currentServer.name": {
      handler() {
        return (this.rename.name = this.$store.state.currentServer.name);
      },
      immediate: true,
    },
    "$store.state.currentServer.ip": {
      handler() {
        return (this.ip.ip = this.$store.state.currentServer.ip);
      },
      immediate: true,
    },
  },
  methods: {
    changeName() {
      this.$axios
        .post("/server/" + this.$route.params.serverid + "/rename", {
          name: this.rename.name,
        })
        .then((res) => {
          this.$store.state.currentServer.name = res.data.name;
          this.$toast.success("Changed server name");
        })
        .catch(() => {
          this.$toast.error("Failed to change server name");
        });
    },
    enableIpUpdate() {
      this.ipChanged = true;
    },
    changeIp() {
      this.fieldErrors.ip.message = undefined;
      this.fieldErrors.ip.status = undefined;

      this.$axios
        .post("/server/" + this.$route.params.serverid + "/changeip", {
          ip: this.ip.ip,
        })
        .then((res) => {
          this.$store.state.currentServer.ip = res.data.ip;
          this.$toast.success("Changed server IP address");
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response) {
            this.fieldErrors.ip.message = err.response.data.error.message;
            this.fieldErrors.ip.status = "error";
          } else {
            this.$toast.error("Failed to change server IP address");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
