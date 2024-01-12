<template>
  <div class="p-5">
    <div>
      <a-select
        v-model:value="remote"
        placeholder="Select Storage"
        :options="providers"
        :dropdownMatchSelectWidth="false"
        :loading="backupLoading"
      ></a-select>
    </div>
    <div class="mt-5 flex flex-row justify-between">
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
        @finish="takeOndemandBackup"
        v-if="mode == 'ondemand'"
        layout="inline"
        class="flex flex-row items-center"
      >
        <a-form-item
          name="tag"
          :rules="[{ required: true, message: 'Please enter tag' }]"
        >
          <a-input
            v-model:value="ondemandForm.tag"
            placeholder="Tag for identification"
          />
        </a-form-item>

        <a-form-item class="">
          <button
            class="bg-blue-700 rounded py-2 px-2 text-white mr-5"
            html-type="sumbit"
          >
            Take Backup
          </button>
        </a-form-item>
      </a-form>
    </div>
  </div>

  <DataTable
    :value="showList"
    class="p-datatable-lg"
    :rowHover="true"
    dataKey="siteId"
    selectionMode="single"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[2, 10, 20, 50]"
    responsiveLayout="scroll"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    :paginator="showList.length > 10"
    :rows="10"
    :loading="backupLoading"
  >
    <template #empty>
      <div class="">No Backups Available</div>
    </template>

    <Column
      field="startTime"
      header="Created On"
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
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import SelectButton from "primevue/selectbutton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: { SelectButton, DataTable, Column },
  data() {
    return {
      ondemandForm: { tag: "" },
      remote: undefined,
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
      ],
      showList: [],
      backupLoading: false,
      backupList: {
        automatic: [],
        ondemand: [],
      },
    };
  },
  computed: {
    providers() {
      let options = [];
      if (!this.$store.state.currentSite?.remoteBackup) {
        return options;
      }
      for (const remote of this.$store.state.currentSite?.remoteBackup) {
        options.push({
          value: remote.provider + "-" + remote.bucket,
          label: remote.provider + "-" + remote.bucket,
        });
      }
      return options;
    },
    restoreBackup() {
      this.$axios
        .post("/site/" + this.$route.params.siteid + "/restorebackup", {
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
  },
  watch: {
    remote() {
      this.getRemoteBackups();
      console.log(this.remote);
    },
    mode() {
      if (this.mode == "automatic") {
        this.showList = this.backupList.automatic;
      } else if (this.mode == "ondemand") {
        this.showList = this.backupList.ondemand;
      }
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
        }
      },
    },
  },
  methods: {
    getRemoteBackups() {
      this.backupLoading = true;
      this.$axios
        .get(
          "/site/" +
            this.$route.params.siteid +
            "/backup/remote/list/" +
            this.remote
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
        })
        .finally(() => {
          this.backupLoading = false;
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
    takeOndemandBackup() {
      console.log("taking remote ondemand");
      console.log(this.remote);
      if (this.remote == undefined || this.remote == "") {
        return;
      }
      this.$axios
        .post("site/" + this.$route.params.siteid + "/backup/remote/ondemand", {
          tag: this.ondemandForm.tag,
          storage: this.remote,
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
