<template>
  <Nav v-if="show && !loading"></Nav>
  <div class="ml-72 mr-8" v-if="show">
    <router-view></router-view>
  </div>
  <Login v-if="$route.name === 'login'"></Login>
  <a-spin v-if="loading" size="large" class="center-screen"/>
  <contextHolder />
</template>

<script setup>
import {ref, onMounted, inject, provide} from 'vue';
import Nav from "./components/Nav/Nav.vue";
import Login from "./components/Auth/Login.vue";
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {Modal} from 'ant-design-vue';

const axios = inject('axios');

// Ref for loading state
const loading = ref(true);

// Access to the store
const store = useStore();

const router = useRouter();

// Computed property
const show = ref(store.state.user);

const [modal, contextHolder] = Modal.useModal();

provide('modal', modal);
provide('$store', store);
provide('axios', axios);


// Asynchronous function to fetch user details
const fetchUserDetails = async () => {
  try {
    store.commit("setUser", null);
    const res = await axios.get("/auth/getUserDetails");
    store.commit("setUser", res.data);
    // this.$router.push("/servers");
  } catch (error) {
    router.push("/login");
  } finally {
    loading.value = false;
  }
};

// Lifecycle hook using onMounted
onMounted(() => {
  fetchUserDetails();
});
</script>

<style lang="scss">
//* {
//  box-sizing: border-box;
//  margin: 0;
//  padding: 0;
//  font-family: Inter !important;
//  font-size: 16px !important;
//}
body {
  background-color: #eff3f8 !important;
  height: 100%;
}
html {
  height: 100%;
}
//.ant-modal-content {
//  border-radius: 5px !important;
//}
//.ant-modal-header {
//  border-radius: 5px 5px 0 0 !important;
//}
//.pi {
//  font-family: "primeicons" !important;
//}
//
//.ant-checkbox-checked .ant-checkbox-inner {
//  background-color: var(--indigo-700) !important;
//  border-color: var(--indigo-700) !important;
//}
//.ant-checkbox-wrapper:hover .ant-checkbox-inner,
//.ant-checkbox:hover .ant-checkbox-inner,
//.ant-checkbox-input:focus + .ant-checkbox-inner {
//  border-color: var(--indigo-700) !important;
//}
//
//.ant-checkbox-checked::after {
//  border: 1px solid var(--indigo-700) !important;
//}
//
//.p-tag {
//  font-size: 0.75rem !important;
//  // display: table;
//  // margin: 0 auto;
//}
//
//.ant-radio-checked .ant-radio-inner {
//  border-color: var(--indigo-700) !important;
//}
//.ant-radio-inner::after {
//  background-color: var(--indigo-700) !important;
//}
//
//.pi::before {
//  position: unset;
//}
//
//.anticon {
//  vertical-align: 0 !important;
//}
.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  box-shadow: none !important;
}

.center-screen {
  position:fixed;
  top: 50%;
  left: 50%;
  width:30em;
  height:18em;
  margin-top: -9em; /*set to a negative number 1/2 of your height*/
  margin-left: -15em; /*set to a negative number 1/2 of your width*/
}
</style>
