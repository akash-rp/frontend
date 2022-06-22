<template>
  <div class="mt-5 ml-5 flex flex-row justify-between items-center">
    <SelectButton
      v-model="mode"
      :options="options"
      optionLabel="name"
      optionValue="value"
    />
    <a-form
      :model="ondemandForm"
      name="ondemand"
      autocomplete="off"
      @finish="takeLocalOndemandBackup"
      v-if="mode == 'ondemand'"
      layout="inline"
      class="flex flex-row items-center"
    >
      <a-form-item
        label=""
        name="tag"
        :rules="[{ required: true, message: 'Please enter tag' }]"
      >
        <a-input
          v-model:value="ondemandForm.tag"
          placeholder="Tag for identification"
        />
      </a-form-item>

      <a-form-item>
        <button
          class="bg-blue-700 rounded py-2 px-2 text-white mr-5"
          html-type="sumbit"
        >
          Take Backup
        </button>
      </a-form-item>
    </a-form>
  </div>
  <DataTable
    :value="showList"
    class="p-datatable-lg mt-5"
    :rowHover="true"
    dataKey="siteId"
    selectionMode="single"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[2, 10, 20, 50]"
    responsiveLayout="scroll"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    :paginator="showList.length > 10"
    :rows="10"
  >
    <template #empty>
      <div class="">No Backups Available</div>
    </template>

    <Column
      field="startTime"
      header="Created"
      headerStyle="background-color:#eff3f8;"
    >
      <template #body="{ data }">
        {{ getdate(data.startTime) }}
      </template>
    </Column>
    <Column
      field="size"
      header="Backup Size"
      headerStyle="background-color:#eff3f8;"
      bodyClass=""
    >
      <template #body="{ data }">
        {{ formatSize(data.rootEntry.summ.size) }}
      </template>
    </Column>
    <Column
      field="description"
      header="Tag"
      headerStyle="background-color:#eff3f8;"
      bodyClass=""
      v-if="mode !== 'automatic'"
    >
    </Column>
    <Column headerStyle="background-color:#eff3f8;">
      <template #body="{ data }">
        <div class="flex flex-row items-center">
          <div
            class="border w-min px-4 py-2 cursor-pointer rounded text-gray-700 hover:text-indigo-700 hover:border-indigo-700"
            @click="
              initRestore(getdate(data.startTime), data.rootEntry.obj, mode)
            "
          >
            Restore
          </div>
          <div class="ml-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              @click="downloadBackup(data.id, mode)"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </div>
        </div>
      </template>
    </Column>
  </DataTable>

  <teleport to="body">
    <div
      class="w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 top-0 left-0 fixed rounded"
      @keydown.esc="modalOpen = false"
      tabindex="0"
      ref="deleteDomain"
      @click.self="modalOpen = false"
      v-if="modalOpen"
    >
      <div class="flex flex-col bg-white w-1/2 rounded">
        <h1 class="text-4xl font-bold p-10 border-b text-indigo-700">
          Backup Restore
        </h1>
        <div class="flex flex-col mt-5 px-10 text-2xl mb-10">
          <p>
            Restore backup from
            <span class="font-bold">{{ restore.date }}</span> to Site Name
            <span class="font-bold">{{
              this.$store.state.currentSite.name
            }}</span>
          </p>
        </div>
        <div class="flex flex-col px-10">
          <label class="text-2xl font-semibold mb-3">Restore Type</label>
          <div>
            <input
              type="radio"
              id="webapp"
              class="form-radio h-7 w-7 mr-5"
              value="webapp"
              v-model="restore.type"
            />
            <label for="webapp" class="text-2xl mr-10">Web Application</label>
          </div>
          <div>
            <input
              type="radio"
              id="db"
              class="form-radio h-7 w-7 mr-5"
              value="db"
              v-model="restore.type"
            />
            <label for="db" class="text-2xl">Database</label>
          </div>
          <div>
            <input
              type="radio"
              id="both"
              class="form-radio h-7 w-7 mr-5"
              value="both"
              v-model="restore.type"
            />
            <label for="both" class="text-2xl">Both</label>
          </div>
        </div>
        <div class="px-10 py-4 bg-gray-100 my-4">
          <p class="text-2xl">{{ restore.message }}</p>
        </div>
        <div class="flex flex-row justify-end mb-5">
          <button
            class="rounded border-2 w-56 font-bold mr-10"
            @click="modalOpen = false"
          >
            Cancel
          </button>
          <button
            class="bg-indigo-700 rounded text-white font-bold p-5 w-56 mr-10"
            @click="restoreBackup"
          >
            Restore
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default {
  components: { SelectButton, DataTable, Column },
  name: "backup",
  data() {
    return {
      ondemandForm: { tag: "" },
      backupList: { automatic: [], ondemand: [], system: [] },
      showList: [],
      modalOpen: false,
      restore: {
        id: "",
        date: "",
        type: "both",
        message:
          "This process will overwrite both Web Application and Database",
        mode: "",
      },
      mode: "automatic",
      options: [
        {
          name: "Automatic",
          value: "automatic",
        },
        {
          name: "Manual",
          value: "ondemand",
        },
        {
          name: "System",
          value: "system",
        },
      ],
    };
  },
  created() {
    this.getLocalBackups();
    // this.showList = this.backupList.automatic;
  },
  methods: {
    downloadBackup(id, mode) {
      window.open(
        "http://localhost/site/" +
          this.$route.params.siteid +
          "/backup/download/" +
          mode +
          "/" +
          id
      );
    },
    restoreBackup() {
      this.$axios
        .post("/site/" + this.$route.params.siteid + "/restorelocalbackup", {
          restore: {
            id: this.restore.id,
            date: this.restore.date,
            type: this.restore.type,
            mode: this.restore.mode,
          },
        })
        .then(() => {
          this.modalOpen = false;
        })
        .catch(() => {
          this.$toast.error("Failed to restore backup");
        });
    },
    getLocalBackups() {
      this.$axios
        .get(
          "/site/" + this.$route.params.siteid + "/localbackuplist/automatic"
        )
        .then((res) => {
          this.backupList = res.data;
          this.backupList.automatic.sort(function (a, b) {
            return b.startTime.localeCompare(a.startTime);
          });
          this.backupList.ondemand.sort(function (a, b) {
            return b.startTime.localeCompare(a.startTime);
          });
          if (this.mode == "automatic") {
            this.showList = this.backupList.automatic;
          }
        });
    },
    getdate(date) {
      let d = new Date(date);
      let options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      };
      return d.toLocaleString("en-us", options);
    },
    formatSize(byte) {
      let mb = byte / 1000000;
      return Math.round(mb) + " MB";
    },
    initRestore(date, id, mode) {
      this.modalOpen = true;
      this.restore.id = id;
      this.restore.date = date;
      this.restore.mode = mode;
    },
    takeLocalOndemandBackup() {
      this.$axios
        .post("site/" + this.$route.params.siteid + "/localondemandbackup", {
          tag: this.ondemandForm.tag,
        })
        .then((res) => {
          if (typeof res.data !== String) {
            this.backupList = res.data;
          }
          this.$toast.success("Created ondemand backup");
          this.ondemandForm.tag = "";
        })
        .catch(() => {
          this.$toast.error("Failed to create ondemand backup");
        });
    },
  },

  watch: {
    "restore.type"() {
      if (this.restore.type == "both") {
        this.restore.message =
          "This process will overwrite both Web Application and Database";
      } else if (this.restore.type == "db") {
        this.restore.message = "This process will overwrite Database";
      } else if (this.restore.type == "webapp") {
        this.restore.message = "This process will overwrite Web Application";
      }
    },
    mode() {
      if (this.mode == "automatic") {
        this.showList = this.backupList.automatic;
      } else if (this.mode == "ondemand") {
        this.showList = this.backupList.ondemand;
      } else {
        this.showList = this.backupList.system;
      }
      this.getLocalBackups();
    },
    backupList: {
      deep: true,
      handler() {
        this.backupList.automatic.sort(function (a, b) {
          return b.startTime.localeCompare(a.startTime);
        });
        this.backupList.ondemand.sort(function (a, b) {
          return b.startTime.localeCompare(a.startTime);
        });
        if (this.mode == "automatic") {
          this.showList = this.backupList.automatic;
        } else if (this.mode == "ondemand") {
          this.showList = this.backupList.ondemand;
        } else {
          this.showList = this.backupList.system;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.p-button:focus) {
  box-shadow: none !important;
}

.p-selectbutton {
  box-shadow: none;
}

:deep(.pi) {
  line-height: 0 !important;
}
</style>
