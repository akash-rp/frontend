<template>
  <create-staging
    v-if="!this.$store.state.currentSite?.staging"
  ></create-staging>
  <div v-if="this.$store.state.currentSite?.staging">
    <div class="main_bg">
      <h3 class="text-3xl font-bold mb-10">Staging Site</h3>
      <div class="flex space-x-4">
        <div class="flex-1">
          <p class="text-xl font-semibold text-gray-400">App Name</p>
          <p class="p-4 rounded-md text-xl bg-gray-100 shadow-inner">
            {{ appName }}
          </p>
        </div>
        <div class="flex-1">
          <p class="text-xl font-semibold text-gray-400">Domain name</p>
          <p class="p-4 rounded-md text-xl bg-gray-100 shadow-inner">
            {{ appUrl }}
          </p>
        </div>
        <div class="flex-1">
          <p class="text-xl font-semibold text-gray-400">Path</p>
          <p class="p-4 rounded-md text-xl bg-gray-100 shadow-inner">
            {{ appPath }}
          </p>
        </div>
      </div>
    </div>
    <div class="main_bg mt-10 pb-10">
      <div class="flex items-center mb-10">
        <h3 class="text-3xl font-semibold inline-block mr-10">Push</h3>
        <span class="px-2 py-1 text-xl bg-green-600 rounded text-white"
          >Live</span
        >
        <span class="text-xl justify-center font-bold mx-2">to</span>
        <span class="px-2 py-1 text-xl bg-yellow-500 rounded text-white"
          >Staging</span
        >
      </div>
      <div class="flex items-center">
        <p class="text-2xl text-gray-500 inline-block">
          You can push changes made in
          <span class="font-semibold">Live</span> wordpress Site to
          <span class="font-semibold">Staging</span> wordpress Site
        </p>
        <button
          class="float-right text-white bg-indigo-600 text-xl px-8 py-4 rounded-md shadow font-semibold ml-auto"
          @click="
            syncType = 'push';
            showSyncPopup = true;
          "
        >
          Push Changes
        </button>
      </div>
    </div>
    <div class="main_bg mt-10">
      <div class="flex items-center mb-10">
        <h3 class="text-3xl font-semibold inline-block mr-10">Pull</h3>
        <span class="px-2 py-1 text-xl bg-yellow-500 rounded text-white"
          >Staging</span
        >
        <span class="text-xl justify-center font-bold mx-2">to</span>
        <span class="px-2 py-1 text-xl bg-green-600 rounded text-white"
          >Live</span
        >
      </div>
      <div class="flex items-center">
        <p class="text-2xl text-gray-500 inline-block">
          You can pull changes made in
          <span class="font-semibold">Staging</span> wordpress Site to
          <span class="font-semibold">Live</span> wordpress Site
        </p>
        <button
          class="float-right text-white bg-indigo-600 text-xl px-8 py-4 rounded-md shadow font-semibold ml-auto"
          @click="
            syncType = 'pull';
            showSyncPopup = true;
          "
        >
          Pull Changes
        </button>
      </div>
    </div>
    <div class="main_bg mt-10">
      <h3 class="text-3xl font-semibold">Delete staging site</h3>
      <div class="flex mt-10 items-center">
        <p class="text-2xl text-gray-500">
          Deleting Staging site will remove all of its files/folders and
          database from the server
        </p>
        <button
          class="text-xl px-8 py-4 text-white font-semibold ml-auto bg-red-700 rounded"
          @click="showDeletePopup = true"
        >
          Delete Staging Site
        </button>
      </div>
    </div>
  </div>
  <sync-changes
    v-if="showSyncPopup"
    :syncType="syncType"
    @close="showSyncPopup = false"
  ></sync-changes>
  <delete-staging
    @close="showDeletePopup = false"
    v-if="showDeletePopup == true"
    :name="appName"
  ></delete-staging>
</template>

<script>
import CreateStaging from "./CreateStaging";
import syncChanges from "./syncChanges.vue";
import DeleteStaging from "./DeleteStaging.vue";
export default {
  components: { CreateStaging, syncChanges, DeleteStaging },
  data() {
    return {
      showSyncPopup: false,
      showDeletePopup: false,
      appName: "",
      appUrl: "",
      appUser: "",
      syncType: "",
    };
  },
  methods: {
    fetchStagingSite() {
      console.log(this.$store.state.currentSite);
      this.axios
        .get("http://localhost/staging/" + this.$route.params.siteid)
        .then((res) => {
          res = res.data;
          this.appName = res.name;
          this.appUrl = res.domain.primary.url;
          this.appUser = res.user;
        });
    },
  },
  computed: {
    appPath() {
      return "/home/" + this.appUser + "/" + this.appName + "/";
    },
  },
  created() {
    this.fetchStagingSite();
  },
};
</script>

<style></style>
