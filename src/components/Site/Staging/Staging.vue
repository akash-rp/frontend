<template>
  <create-staging
    v-if="!this.$store.state.currentSite?.staging"
  ></create-staging>
  <div v-if="this.$store.state.currentSite?.staging">
    <h3 class="header">Staging Site</h3>
    <div class="px-5">
      <div class="flex">
        <div class="flex-1 mr-5">
          <p class="font-semibold">App Name</p>
          <p class="p-2 rounded-md bg-default shadow-inner">
            {{ appName }}
          </p>
        </div>
        <div class="flex-1 mr-5">
          <p class="font-semibold">Domain name</p>
          <p class="p-2 rounded-md bg-default shadow-inner">
            {{ appUrl }}
          </p>
        </div>
        <div class="flex-1">
          <p class="font-semibold">Path</p>
          <p class="p-2 rounded-md bg-default shadow-inner">
            {{ appPath }}
          </p>
        </div>
      </div>
      <hr class="-mx-5 my-5" />
      <div class="">
        <div class="flex items-center">
          <h3 class="text-xl font-semibold inline-block mr-2">Push</h3>
          <tag>Live</tag>
          <span class="text-xl justify-center font-bold mx-2">to</span>
          <tag severity="warning">Staging</tag>
        </div>
        <div class="flex items-center mt-2">
          <p class="text-gray-500 inline-block">
            Push changes made in
            <span class="font-semibold">Live</span> wordpress Site to
            <span class="font-semibold">Staging</span> wordpress Site
          </p>
          <button
            class="float-right text-indigo-700 border-indigo-700 border py-1 px-2 rounded shadow font-semibold ml-auto"
            @click="
              syncType = 'push';
              showSyncPopup = true;
              title = 'Push Changes';
            "
          >
            Push Changes
          </button>
        </div>
      </div>
      <hr class="-mx-5 my-5" />

      <div class="">
        <div class="flex items-center">
          <h3 class="text-xl font-semibold inline-block mr-2">Pull</h3>
          <tag severity="warning">Staging</tag>
          <span class="text-xl justify-center font-bold mx-2">to</span>
          <tag>Live</tag>
        </div>
        <div class="flex items-center mt-2">
          <p class="text-gray-500 inline-block">
            Pull changes made in
            <span class="font-semibold">Staging</span> wordpress Site to
            <span class="font-semibold">Live</span> wordpress Site
          </p>
          <button
            class="float-right text-orange-500 border border-orange-500 px-2 py-1 rounded shadow font-semibold ml-auto"
            @click="
              syncType = 'pull';
              title = 'Pull Changes';
              showSyncPopup = true;
            "
          >
            Pull Changes
          </button>
        </div>
      </div>
      <hr class="-mx-5 my-5" />

      <div class="my-5">
        <h3 class="text-xl font-semibold">Delete staging site</h3>
        <div class="flex items-center mt-2">
          <p class="text-gray-500">
            Deleting Staging site will remove all of its files/folders and
            database from the server
          </p>
          <button
            class="px-2 py-1 text-white font-semibold ml-auto bg-red-700 rounded"
            @click="showDeletePopup = true"
          >
            Delete Staging Site
          </button>
        </div>
      </div>
    </div>
  </div>
  <a-modal
    v-model:visible="showSyncPopup"
    :title="title"
    width="700px"
    :destroyOnClose="true"
  >
    <sync-changes
      :syncType="syncType"
      @close="showSyncPopup = false"
      ref="sync"
    ></sync-changes>
    <template #footer>
      <button
        class="py-2 px-4 font-medium border border-black rounded"
        @click="showSyncPopup = false"
      >
        Cancel
      </button>
      <button
        class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
        @click="$refs.sync.pushChanges"
      >
        Push Changes
      </button>
    </template>
  </a-modal>
  <a-modal
    v-model:visible="showDeletePopup"
    title="Delete Staging Site"
    width="700px"
  >
    <delete-staging
      :name="appName"
      ref="deleteStaging"
      @close="showDeletePopup = false"
    ></delete-staging>
    <template #footer>
      <button
        class="py-2 px-4 font-medium border border-black rounded"
        @click="showDeletePopup = false"
      >
        Cancel
      </button>
      <button
        class="py-2 px-4 bg-red-700 text-white rounded pointer"
        @click="$refs.deleteStaging.deleteStaging"
      >
        Delete
      </button>
    </template>
  </a-modal>
</template>

<script>
import CreateStaging from "./CreateStaging.vue";
import syncChanges from "./syncChanges.vue";
import DeleteStaging from "./DeleteStaging.vue";
import Tag from "primevue/tag";
export default {
  components: { CreateStaging, syncChanges, DeleteStaging, Tag },
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
      this.$axios.get("/staging/" + this.$route.params.siteid).then((res) => {
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
