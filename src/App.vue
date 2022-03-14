<template>
  <Nav v-if="!isLogin"></Nav>
  <div class="ml-64 mr-8">
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "./components/Nav/Nav.vue";
export default {
  components: {
    Nav,
  },
  computed: {
    isLogin() {
      return this.$route.name === "login" || this.$route.name === "register";
    },
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Inter;
}
body {
  background-color: #eff3f8;
  height: 100%;
}
html {
  height: 100%;
}
</style>
