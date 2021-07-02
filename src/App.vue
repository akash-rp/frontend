<template>
  <Nav v-if="!isLogin"></Nav>
  <router-view></router-view>
</template>

<script>
import Nav from "./components/Nav";
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
<style src="./styles/base.css"></style>
