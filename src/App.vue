<template>
  <Nav v-if="show"></Nav>
  <div class="ml-72 mr-8" v-if="show">
    <router-view></router-view>
  </div>
  <Login v-if="this.$route.name === 'login'"></Login>
</template>

<script>
import Nav from "./components/Nav/Nav.vue";
import Login from "./components/Auth/Login.vue";
export default {
  data() {
    return {
      loading: true,
    };
  },
  components: {
    Nav,
    Login,
  },
  computed: {
    show() {
      return this.$store.state.user;
    },
  },
  async created() {
    await this.$axios
      .get("http://localhost:4000/sessions/whoami")
      .then((res) => {
        this.$store.commit("setUser", res.data);
        // this.$router.push("/servers");
      })
      .catch(() => {
        console.log("catched");
        this.$router.push("/login");
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Inter !important;
  font-size: 16px !important;
}
body {
  background-color: #eff3f8 !important;
  height: 100%;
}
html {
  height: 100%;
}
.ant-modal-content {
  border-radius: 5px !important;
}
.ant-modal-header {
  border-radius: 5px 5px 0 0 !important;
}
.pi {
  font-family: "primeicons" !important;
}

.ant-checkbox-checked .ant-checkbox-inner {
  background-color: var(--indigo-700) !important;
  border-color: var(--indigo-700) !important;
}
.ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner,
.ant-checkbox-input:focus + .ant-checkbox-inner {
  border-color: var(--indigo-700) !important;
}

.ant-checkbox-checked::after {
  border: 1px solid var(--indigo-700) !important;
}

.p-tag {
  font-size: 0.75rem !important;
  // display: table;
  // margin: 0 auto;
}

.ant-radio-checked .ant-radio-inner {
  border-color: var(--indigo-700) !important;
}
.ant-radio-inner::after {
  background-color: var(--indigo-700) !important;
}

.pi::before {
  position: unset;
}

.anticon {
  vertical-align: 0 !important;
}
.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  box-shadow: none !important;
}
</style>
