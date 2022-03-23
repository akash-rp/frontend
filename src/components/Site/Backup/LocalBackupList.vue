<template>
  <div class="mt-5 ml-5 flex flex-row justify-between items-center">
    <!-- <p
      class="inline-block p-4 border  text-xl  rounded-l-md cursor-pointer"
      :class="{
        'text-white bg-indigo-700': mode == 'automatic',
        'hover:bg-gray-100': mode != 'automatic',
      }"
      @click="mode = 'automatic'"
    >
      Automatic
    </p>
    <p
      class="inline-block p-4 border border-l-0 text-xl rounded-r-md cursor-pointer "
      :class="{
        'text-white bg-indigo-700': mode == 'ondemand',
        'hover:bg-gray-100': mode != 'ondemand',
      }"
      @click="mode = 'ondemand'"
    >
      Manual
    </p> -->
    <SelectButton
      v-model="mode"
      :options="options"
      optionLabel="name"
      optionValue="value"
    />
    <button
      class="bg-blue-700 rounded py-2 px-2 text-white mr-5"
      @click="takeLocalOndemandBackup"
      v-if="mode == 'ondemand'"
    >
      Take Backup
    </button>
  </div>
  <DataTable
    :value="showList"
    class="p-datatable-lg mt-5"
    :rowHover="true"
    dataKey="siteId"
    selectionMode="single"
    @rowSelect="onSiteRowSelect"
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
    <Column headerStyle="background-color:#eff3f8;">
      <template #body>
        <div
          class="border w-min px-4 py-2 cursor-pointer rounded text-gray-700 hover:text-indigo-700 hover:border-indigo-700"
          @click="initRestore(getdate(one.startTime), one.rootEntry.obj, mode)"
        >
          Restore
        </div>
      </template>
    </Column>
  </DataTable>
  <!-- <table class="sortable mt-4 w-full">
    <thead class="">
      <tr class="bg-gray-100">
        <th
          class="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-gray-500 w-8/12"
        >
          Created
        </th>

        <th
          class="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 font-semibold text-left text-gray-500"
        >
          Size
        </th>
        <th class="w-40"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="one in getlist"
        :key="one.id"
        class="border-b hover:bg-gray-100"
      >
        <td
          class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 w-80"
        >
          {{ getdate(one.startTime) }}
        </td>
        <td
          class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4"
        >
          {{ formatSize(one.rootEntry.summ.size) }}
        </td>
        <td
          class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4"
        >
          <div
            class="border w-min px-4 py-2 cursor-pointer rounded text-gray-700 hover:text-indigo-700 hover:border-indigo-700"
            @click="
              initRestore(getdate(one.startTime), one.rootEntry.obj, mode)
            "
          >
            Restore
          </div>
        </td>
      </tr>
    </tbody>
  </table> -->
  <!-- <div class="mt-4">
    <p
      v-for="(i, n) in listLength"
      :key="i"
      class="inline-block mr-2 text-xl m-4 border p-4 cursor-pointer"
      :class="{
        'bg-indigo-700 text-white': n == currentPage,
        'hover:bg-gray-100': n != currentPage,
      }"
      @click="currentPage = n"
    >
      {{ i }}
    </p>
  </div> -->
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
      backupList: {},
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
          name: "Ondemand",
          value: "ondemand",
        },
      ],
    };
  },
  created() {
    this.getLocalBackups();
    // this.showList = this.backupList.automatic;
  },
  methods: {
    restoreBackup() {
      fetch(
        "http://localhost/site/" +
          this.$route.params.siteid +
          "/restorelocalbackup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restore: {
              id: this.restore.id,
              date: this.restore.date,
              type: this.restore.type,
              mode: this.restore.mode,
            },
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.modalOpen = false;
          }
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
        timeZone: "UTC",
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
      fetch(
        "http://localhost/site/" +
          this.$route.params.siteid +
          "/localondemandbackup"
      );
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
      } else {
        this.showList = this.backupList.ondemand;
      }
      this.getLocalBackups();
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
