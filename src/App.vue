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
<style lang="scss">
:root {
  --color-primary: #1633ff;
  --font-size-primary: 1.4rem;
  --font-size-header: 3rem;
  --font-size-small-header: 1.6rem;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 10px;
  font-family: "Open Sans";
}

body {
  background-color: #f2f4f9;
}

// .router-link-exact-active {
//   color: black !important;
// }
.container {
  display: grid;
  margin: 3rem auto;
  width: 1100px;
  grid-template-columns: [first] 13% [line2] auto [end];
  grid-template-rows: [row1-start] auto [row1-end] auto [third-line] auto [last-line];
}

.head {
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  align-items: center;
}
.option {
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  grid-column: 1/2;
  grid-row: 2/3;
  margin-top: 1rem;
}
.head {
  &_svg {
    width: 5rem;
    height: 5rem;
    margin-right: 1rem;
  }
  &_name {
    font-family: "Roboto";
    font-size: 4rem;
  }

  &_ip {
    font-size: 2rem;
    margin-top: 7px;
    margin-left: 1rem;
    color: dimgray;

    &_copy {
      width: 2rem;
      height: 2rem;
      fill: dimgray;
      margin-top: 8px;
    }
  }
}

// .options {
//   font-size: 1.5rem;
//   text-decoration: none;
//   color: dimgray;
//   margin-bottom: 1rem;
//   line-height: 2.5rem;
// }
.ip {
  margin-left: 0 !important;
}

.main_bg {
  background-color: white;
  height: max-content;
  padding: 1rem 2rem;
  margin-top: 1rem;
  border-radius: 3px;
  box-shadow: 0px 2px 5px 1px rgba(64, 60, 67, 0.16);
  margin-right: 2rem;
}

.header {
  display: inline-block;
  font-size: var(--font-size-header);
}
.tagline {
  font-size: var(--font-size-primary);
  margin-top: 1rem;
  color: dimgray;
}
</style>
