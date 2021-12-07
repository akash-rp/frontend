<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 top-0 left-0 fixed rounded"
    @keydown.esc="$emit('close')"
    tabindex="0"
    ref="addDomain"
    @click.self="$emit('close')"
  >
    <div class="flex flex-col bg-white w-1/2 rounded">
      <h1 class="text-4xl font-bold p-10 border-b" v-if="syncType == 'push'">
        Push Live Site Changes to Staging Site
      </h1>
      <h1 class="text-4xl font-bold p-10 border-b" v-if="syncType == 'pull'">
        Pull Staging Site Changes to Live Site
      </h1>
      <div class="flex flex-col mt-5 px-10">
        <label class="text-2xl font-semibold mb-3" v-if="syncType == 'push'"
          >What do you want to push?
        </label>
        <label class="text-2xl font-semibold mb-3" v-if="syncType == 'pull'"
          >What do you want to pull?
        </label>
        <div class="flex items-center">
          <!-- <input type="checkbox" id="files" value="files" v-model="pushType" />
          <label for="files" class="text-xl mr-5">Files</label>
          <input
            type="checkbox"
            id="database"
            value="database"
            v-model="pushType"
          />
          <label for="database" class="text-xl mr-5">Database</label> -->
          <input
            type="checkbox"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 w-7 h-7 mr-2"
            id="files"
            value="files"
            v-model="pushType"
          />
          <label for="files" class="text-xl mr-10">Files</label>
          <input
            type="checkbox"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 w-7 h-7 mr-2"
            id="database"
            value="db"
            v-model="pushType"
            @change="databaseClicked($event)"
          />
          <label for="database" class="text-xl">Database</label>
        </div>
      </div>
      <div class="px-10 mt-5" v-if="showDatabase">
        <h1 class="text-2xl font-semibold mb-3" v-if="syncType == 'push'">
          How do you want to push the Database
        </h1>
        <h1 class="text-2xl font-semibold mb-3" v-if="syncType == 'pull'">
          How do you want to pull the Database
        </h1>
        <div class="flex items-center">
          <input
            type="radio"
            id="alias"
            class="form-radio h-7 w-7 mr-5"
            value="full"
            v-model="dbType"
          />
          <label for="alias" class="text-2xl mr-10">Full Database</label>
          <input
            type="radio"
            id="redirect"
            class="form-radio h-7 w-7 mr-5"
            value="partial"
            v-model="dbType"
            @change="selectedPartialDatabase($event)"
          />
          <label for="redirect" class="text-2xl">Partial Database</label>
        </div>
        <div class="mb-3" v-if="dbType == 'partial'">
          <h3 class="text-2xl font-semibold mb-3 mt-5">
            Select the tables you want to push
          </h3>
          <div class="flex items-center">
            <input
              type="checkbox"
              class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 w-7 h-7 mr-2"
              id="selectall"
              v-model="selectedAll"
              @change="selectAllTables($event)"
            />
            <label for="selectall" class="text-xl mr-10 font-semibold"
              >Select All</label
            >
          </div>
        </div>
        <div class="flex overflow-y-scroll mb-5" v-if="dbType == 'partial'">
          <div class="max-h-96">
            <div
              v-for="table in tables.slice(0, tables.length / 2)"
              :key="table"
              class="mb-3"
            >
              <input
                type="checkbox"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 w-7 h-7 mr-2"
                :id="table"
                :value="table"
                v-model="selectedTables"
              />
              <label :for="table" class="text-xl mr-10">{{ table }}</label>
            </div>
          </div>
          <div class="max-h-96">
            <div
              v-for="table in tables.slice(tables.length / 2)"
              :key="table"
              class="mb-3"
            >
              <input
                type="checkbox"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 w-7 h-7 mr-2"
                :id="table"
                :value="table"
                v-model="selectedTables"
              />
              <label :for="table" class="text-xl mr-10">{{ table }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-end mb-5">
        <button
          class="rounded border-2 w-56 font-bold mr-10"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="bg-indigo-700 rounded text-white font-bold p-5 w-56 mr-10"
          @click="pushChanges"
          :class="{ 'opacity-50 cursor-not-allowed': pushType.length == 0 }"
        >
          Push Changes
        </button>
      </div>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pushType: [],
      showDatabase: false,
      dbType: "full",
      error: "",
      selectedTables: [],
      tables: [],
      selectedAll: true,
    };
  },
  props: ["syncType"],
  methods: {
    databaseClicked(event) {
      if (event.target.checked) {
        this.showDatabase = true;
      } else {
        this.showDatabase = false;
      }
    },
    selectedPartialDatabase() {
      fetch(
        "http://localhost/site/" +
          this.$store.state.currentSite.siteId +
          "/getdbtables"
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            return;
          }
          this.tables = data;
        });
    },
    selectAllTables(event) {
      if (event.target.checked) {
        this.selectedTables = this.tables;
      } else this.selectedTables = [];
    },
    pushChanges() {
      if (this.pushType.length == 0) return;
      fetch(
        "http://localhost/site/" +
          this.$store.state.currentSite.siteId +
          "/sync",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: this.syncType,
            type: this.pushType,
            tables: this.selectedTables,
            dbType: this.dbType,
            allSelected: this.selectedAll,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.$emit("close");
          }
        });
    },
  },
  watch: {
    selectedTables() {
      if (this.selectedTables.length == this.tables.length) {
        this.selectedAll = true;
      } else this.selectedAll = false;
    },
    tables() {
      this.selectedTables = this.tables;
    },
  },
};
</script>

<style></style>
