<template>
  <div class="mt-2">
    <p
      class="inline-block p-4 border  text-xl  rounded-l-md cursor-pointer"
      :class="{
        'text-white bg-indigo-700': mode == 'auto',
        'hover:bg-gray-100': mode != 'auto',
      }"
      @click="mode = 'auto'"
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
    </p>
  </div>
  <table class="sortable mt-4 w-full">
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
          class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 "
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
  </table>
  <div class="mt-4">
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
  </div>
  <teleport to="body">
    <div
      class="w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 top-0 left-0 fixed rounded"
      @keydown.esc="modalOpen = false"
      tabindex="0"
      ref="deleteDomain"
      @click.self="modalOpen = false"
      v-if="modalOpen"
    >
      <div class="flex flex-col bg-white  w-1/2 rounded">
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
            <label for="db" class="text-2xl ">Database</label>
          </div>
          <div>
            <input
              type="radio"
              id="both"
              class="form-radio h-7 w-7 mr-5"
              value="both"
              v-model="restore.type"
            />
            <label for="both" class="text-2xl ">Both</label>
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
export default {
  name: "backup",
  data() {
    return {
      autoList: [],
      autoListPagination: {},
      currentPage: 0,
      modalOpen: false,
      restore: {
        id: "",
        date: "",
        type: "both",
        message:
          "This process will overwrite both Web Application and Database",
        mode: "",
      },
      mode: "auto",
    };
  },
  created() {
    this.getLocalBackups();
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
      fetch(
        "http://localhost/site/" +
          this.$route.params.siteid +
          "/localbackuplist/" +
          this.mode,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.autoList = JSON.parse(data);
          this.autoList.sort(function(a, b) {
            return b.startTime.localeCompare(a.startTime);
          });
          this.autoListPagination = {};
          this.currentPage = 0;
          let listLength = this.autoList.length;
          let index = 0;
          for (let i = 0; listLength > 0; ) {
            console.log(listLength);
            if (listLength >= 10) {
              this.autoListPagination[index] = this.autoList.slice(i, i + 10);
              listLength = listLength - 10;
            } else {
              this.autoListPagination[index] = this.autoList.slice(
                i,
                i + listLength
              );
              listLength = 0;
            }
            index++;
            i = i + 10;
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
  },

  computed: {
    listLength() {
      return Object.keys(this.autoListPagination).length;
    },
    getlist() {
      return this.autoListPagination[this.currentPage];
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
      this.getLocalBackups();
    },
  },
};
</script>

<style></style>
