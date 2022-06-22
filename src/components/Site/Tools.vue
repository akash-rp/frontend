<template>
  <a-modal
    v-model:visible="showChangeUser"
    title="Change Ownership"
    style="border-radius: 1rem"
  >
    <template #footer>
      <button
        class="py-2 px-4 font-medium border border-black rounded"
        @click="showChangeUser = false"
      >
        Cancel
      </button>
      <button
        class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
        html-type="submit"
        type="submit"
        form="owner"
      >
        Change Owner
      </button>
    </template>
    <ChangeOwnership @close="showChangeUser = false"></ChangeOwnership>
  </a-modal>
  <a-modal
    v-model:visible="showSiteAuth"
    title="Enable Site Authentication"
    style="border-radius: 1rem"
  >
    <template #footer>
      <button
        class="py-2 px-4 font-medium border border-black rounded"
        @click="showSiteAuth = false"
      >
        Cancel
      </button>
      <button
        class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
        html-type="submit"
        type="submit"
        form="siteauth"
      >
        Enable
      </button>
    </template>
    <EnableSiteAuth @close="showSiteAuth = false"></EnableSiteAuth>
  </a-modal>
  <a-modal
    v-model:visible="showSearchAndReplaceModal"
    title="Search And Replace"
    style="border-radius: 1rem"
  >
    <template #footer>
      <button
        class="py-2 px-4 font-medium border border-black rounded"
        @click="showSearchAndReplaceModal = false"
      >
        Cancel
      </button>
      <button
        class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
        html-type="submit"
        type="submit"
        form="searchReplace"
      >
        Replace
      </button>
    </template>
    <SearchAndReplace @close="showChangeUser = false"></SearchAndReplace>
  </a-modal>
  <div>
    <h1 class="header border-b">Settings</h1>
    <div class="">
      <div
        class="flex flex-row justify-between py-4 items-center border-b px-5"
      >
        <h2 class="font-semibold">Change Site Owner</h2>
        <button
          class="p-2 bg-indigo-700 text-white font-semibold rounded-md text-sm"
          @click="openChangeOwnerModal"
        >
          Change Owner
        </button>
      </div>
      <div
        class="flex flex-row justify-between py-4 items-center border-b px-5"
      >
        <h2 class="font-semibold">Site Authentication</h2>
        <button
          class="p-2 bg-indigo-700 text-white font-semibold rounded-md text-sm"
          @click="showSiteAuth = true"
          v-if="!this.$store.state.currentSite.authentication"
        >
          Enable
        </button>
        <a-popconfirm
          placement="topRight"
          title="Are you sure to disable site authentication?"
          ok-text="Disable"
          cancel-text="No"
          @confirm="disableAuth"
          v-if="this.$store.state.currentSite.authentication"
        >
          <button
            class="p-2 bg-red-700 text-white font-semibold rounded-md text-sm"
            v-if="this.$store.state.currentSite.authentication"
          >
            Disable
          </button>
        </a-popconfirm>
      </div>
      <div
        class="flex flex-row justify-between py-4 items-center border-b px-5"
      >
        <h2 class="font-semibold">Fix Ownership Permission</h2>
        <a-popconfirm
          placement="topRight"
          title="Are you sure to fix ownership permission?"
          ok-text="Fix"
          cancel-text="No"
          @confirm="fixPermission"
        >
          <button
            class="p-2 bg-indigo-700 text-white font-semibold rounded-md text-sm"
          >
            Fix Permission
          </button>
        </a-popconfirm>
      </div>
    </div>
    <div class="flex flex-row justify-between py-4 items-center border-b px-5">
      <h2 class="font-semibold">Search And Replace Tool</h2>
      <button
        class="p-2 bg-indigo-700 text-white font-semibold rounded-md text-sm"
        @click="showSearchAndReplaceModal = true"
      >
        Search and Replace
      </button>
    </div>
  </div>
</template>

<script>
import ChangeOwnership from "./Tools/ChangeOwnership.vue";
import EnableSiteAuth from "./Tools/EnableSiteAuth.vue";
import SearchAndReplace from "./Tools/SearchAndReplace.vue";
export default {
  components: { ChangeOwnership, EnableSiteAuth, SearchAndReplace },
  data() {
    return {
      showChangeUser: false,
      showSiteAuth: false,
      showSearchAndReplaceModal: false,
    };
  },
  methods: {
    openChangeOwnerModal() {
      this.showChangeUser = true;
    },
    disableAuth() {
      return this.$axios
        .post("/site/" + this.$route.params.siteid + "/auth/disable")
        .then((res) => {
          this.$store.commit("setCurrentSite", res.data);
          this.$toast.success("Authentication disabled for site");
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Failed to disable authentication");
        });
    },
    fixPermission() {
      return this.$axios
        .post("/site/" + this.$route.params.siteid + "/fixPermission")
        .then(() => {
          this.$toast.success("Flixed Site ownership permission");
        })
        .catch(() => {
          this.$toast.error("Failed to fix site ownership permission");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
