<template>
  <div class="flex flex-col">
    <div class="flex flex-col">
      <p class="font-medium" v-if="syncType == 'push'">
        Pushing changes from live site to staging site will overwrite any
        changes made in the staging site. A Backup of staging site will be taken
        before pushing.
      </p>
      <p class="font-medium" v-if="syncType == 'pull'">
        Pulling changes from staging site to live site will overwrite any
        changes made in the live site. A Backup of live site will be taken
        before pulling.
      </p>
      <label class="text-lg font-semibold my-3" v-if="syncType == 'push'"
        >What do you want to push?
      </label>
      <label class="text-lg font-semibold my-3" v-if="syncType == 'pull'"
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
        <!-- <input
          type="checkbox"
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 w-7 h-7 mr-2"
          id="files"
          value="files"
          v-model="pushType"
        /> -->
        <a-checkbox-group
          v-model:value="pushType"
          :options="syncOptions"
          @change="onChange"
        />

        <!-- <label for="files" class="mr-10">Files</label> -->
        <!-- <input
          type="checkbox"
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 w-7 h-7 mr-2"
          id="database"
          value="db"
          v-model="pushType"
          @change="databaseClicked($event)"
        />
        <label for="database" class="">Database</label> -->
      </div>
    </div>
    <div class="mt-5" v-if="showDatabase">
      <h1 class="text-lg font-semibold mb-3" v-if="syncType == 'push'">
        How do you want to push the Database
      </h1>
      <h1 class="text-lg font-semibold mb-3" v-if="syncType == 'pull'">
        How do you want to pull the Database
      </h1>
      <div class="flex items-center">
        <!-- <input
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
        <label for="redirect" class="text-2xl">Partial Database</label> -->
        <a-radio-group v-model:value="dbType">
          <a-radio value="full">Full Database</a-radio>
          <a-radio value="partial" @change="selectedPartialDatabase"
            >Partial Database</a-radio
          >
        </a-radio-group>
      </div>
      <div class="mb-3" v-if="dbType == 'partial'">
        <h3 class="text-lg font-semibold mb-3 mt-5">
          Select the tables you want to {{ syncType }}
        </h3>
        <div class="flex items-center">
          <a-checkbox
            id="selectall"
            v-model:checked="selectedAll"
            @change="selectAllTables($event)"
            >Select All</a-checkbox
          >
        </div>
        <hr class="mt-2" />
      </div>
      <div class="flex overflow-y-scroll mb-5" v-if="dbType == 'partial'">
        <div class="max-h-96">
          <!-- <div
            v-for="table in tables.slice(0, tables.length / 2)"
            :key="table"
            class="mb-3"
          >
            <a-checkbox
              type="checkbox"
              :id="table"
              :options="table"
              v-model="selectedTables"
            />
            <label :for="table" class="text-xl mr-10">{{ table }}</label>
          </div> -->
          <a-checkbox-group
            class="flex flex-col"
            type="checkbox"
            id="table"
            :options="tables.slice(0, tables.length / 2)"
            v-model:value="selectedTables['one']"
          />
        </div>
        <div class="max-h-96">
          <!-- <div
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
          </div> -->
          <a-checkbox-group
            class="flex flex-col"
            type="checkbox"
            id="table"
            :options="tables.slice(tables.length / 2)"
            v-model:value="selectedTables['two']"
          />
        </div>
      </div>
    </div>

    <p v-if="error">{{ error }}</p>
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
      selectedTables: { one: [], two: [] },
      tables: [],
      selectedAll: true,
      syncOptions: [
        { label: "Files", value: "files" },
        { label: "Database", value: "db" },
      ],
    };
  },
  props: ["syncType"],
  methods: {
    onChange(checkedValues) {
      this.databaseClicked(checkedValues.includes("db"));
    },
    databaseClicked(show) {
      if (show) {
        this.showDatabase = true;
      } else {
        this.showDatabase = false;
      }
    },
    selectedPartialDatabase() {
      this.$axios
        .get(
          "/site/" +
            this.$store.state.currentSite.siteId +
            "/getdbtables"
        )

        .then((res) => {
          this.tables = res.data;
        })
        .catch(() => {});
    },
    selectAllTables(event) {
      if (event.target.checked) {
        this.selectedTables["one"] = this.tables.slice(
          0,
          this.tables.length / 2
        );
        this.selectedTables["two"] = this.tables.slice(this.tables.length / 2);
      } else this.selectedTables = { one: [], two: [] };
    },
    pushChanges() {
      if (this.pushType.length == 0) return;
      this.$axios
        .post("/site/" + this.$store.state.currentSite.siteId + "/sync", {
          method: this.syncType,
          type: this.pushType,
          tables: [...this.selectedTables.one, ...this.selectedTables.two],
          dbType: this.dbType,
          allSelected: this.selectedAll,
        })
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
    selectedTables: {
      deep: true,
      handler(data) {
        if (
          this.selectedTables["one"].length +
            this.selectedTables["two"].length ==
          this.tables.length
        ) {
          this.selectedAll = true;
        } else this.selectedAll = false;
      },
    },
    tables() {
      this.selectedTables["one"] = this.tables.slice(0, this.tables.length / 2);
      this.selectedTables["two"] = this.tables.slice(this.tables.length / 2);
    },
  },
};
</script>

<style></style>
