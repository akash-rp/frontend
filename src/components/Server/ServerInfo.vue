<template>
  <div class="w-full">
    <div class="flex flex-row">
      <div class="bg-white w-1/3 shadow rounded divide-y divide-y-reverse">
        <h2 class="text-xl font-semibold px-5 py-5 border-b">Server Info</h2>
        <div
          class="flex flex-row justify-between p-5"
          v-for="info in serverInfo"
          v-bind:key="info.source"
        >
          <div class="font-medium">{{ info.source }}</div>
          <div>{{ info.value }}</div>
        </div>
      </div>
      <div class="bg-white ml-5 shadow rounded w-full">
        <h2 class="text-xl p-5 font-semibold border-b">Resource Usage</h2>
        <div class="grid-cols-3 grid" v-if="!resourceError">
          <div class="pb-10 pt-5 border-b text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 946 946"
              style="enable-background: new 0 0 946 946"
              xml:space="preserve"
              class="inline-block w-5 h-5"
            >
              <path
                d="M431.7 589.899h82.6v77.9h-82.6zM304.2 589.899h82.6v77.9h-82.6zM52.7 589.899h79v77.9h-79zM176.6 589.899h82.6v77.9h-82.6zM814.4 589.899h79v77.9h-79zM559.3 589.899h82.601v77.9H559.3zM686.8 589.899h82.601v77.9H686.8zM896 278.2H50c-27.6 0-50 22.4-50 50v34.3c29.1 0 52.7 23.6 52.7 52.7S29.1 467.9 0 467.9v84.3h946v-84.3c-29.1 0-52.7-23.6-52.7-52.699 0-29.101 23.601-52.7 52.7-52.7v-34.3c0-27.701-22.4-50.001-50-50.001zM253.1 434.1c0 27.601-22.4 50-50 50h-38c-27.6 0-50-22.4-50-50v-38c0-27.6 22.4-50 50-50h38c27.6 0 50 22.4 50 50v38zm288.9 0c0 27.601-22.4 50-50 50h-38c-27.6 0-50-22.4-50-50v-38c0-27.6 22.4-50 50-50h38c27.6 0 50 22.4 50 50v38zm287.9 0c0 27.601-22.4 50-50 50h-38c-27.601 0-50-22.4-50-50v-38c0-27.6 22.399-50 50-50h38c27.6 0 50 22.4 50 50v38z"
              />
            </svg>

            <h3 class="px-2 pb-2 text-center font-medium inline-block">RAM</h3>
            <div class="p-4">
              <ProgressBar
                :value="percentMemory"
                style="height: 5px"
                :showValue="false"
              ></ProgressBar>
              <div class="mt-3 text-center">
                <span class="font-medium"
                  >{{
                    parseFloat(
                      this.currentServer.stats.usedMemory / 1024
                    ).toFixed(2)
                  }}
                  GB</span
                >
                used of
                <span class="font-medium">
                  {{
                    parseFloat(
                      this.currentServer.stats.totalMemory / 1024
                    ).toFixed(2)
                  }}
                  GB
                </span>
              </div>
            </div>
          </div>
          <div class="pt-5 border border-t-0 text-center">
            <svg
              class="inline-block w-5 h-5"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm0 22H4V8h28z"
                class="clr-i-outline clr-i-outline-path-1"
              />
              <circle
                cx="6.21"
                cy="10.25"
                r="1.25"
                class="clr-i-outline clr-i-outline-path-2"
              />
              <circle
                cx="29.81"
                cy="10.25"
                r="1.25"
                class="clr-i-outline clr-i-outline-path-3"
              />
              <circle
                cx="6.21"
                cy="25.42"
                r="1.25"
                class="clr-i-outline clr-i-outline-path-4"
              />
              <circle
                cx="29.81"
                cy="25.42"
                r="1.25"
                class="clr-i-outline clr-i-outline-path-5"
              />
              <path
                d="M10 18.62c1.32.31 1.91.54 1.91 1.22s-.53 1.09-1.55 1.09a4 4 0 0 1-2.71-1.11l-.86 1.06a5 5 0 0 0 3.52 1.34c2 0 3.1-1 3.1-2.52s-1.15-2.05-2.87-2.44c-1.31-.3-1.92-.54-1.92-1.21A1.25 1.25 0 0 1 10 15a3.68 3.68 0 0 1 2.37 1l.81-1.1A4.58 4.58 0 0 0 10 13.69c-1.74 0-3 1.05-3 2.49s1.26 2.04 3 2.44z"
                class="clr-i-outline clr-i-outline-path-6"
              />
              <path
                d="M17.83 20.93a4 4 0 0 1-2.71-1.11l-.86 1.06a5 5 0 0 0 3.52 1.34c2 0 3.1-1 3.1-2.52s-1.15-2.05-2.88-2.44c-1.31-.3-1.92-.54-1.92-1.21a1.25 1.25 0 0 1 1.4-1.05 3.68 3.68 0 0 1 2.37 1l.81-1.1a4.56 4.56 0 0 0-3.12-1.15c-1.73 0-3 1.05-3 2.49s1.19 2 2.89 2.44c1.32.31 1.91.54 1.91 1.22s-.49 1.03-1.51 1.03z"
                class="clr-i-outline clr-i-outline-path-7"
              />
              <path
                d="M29.9 18c0-2.41-1.92-4.12-4.64-4.12h-2.9v8.24h2.9C28 22.08 29.9 20.37 29.9 18zm-6-2.76h1.56a2.77 2.77 0 1 1 0 5.53h-1.6z"
                class="clr-i-outline clr-i-outline-path-8"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>

            <h3 class="px-2 pb-2 text-center font-medium inline-block">Disk</h3>
            <div class="p-4">
              <ProgressBar
                :value="percentDisk"
                style="height: 5px"
                :showValue="false"
              ></ProgressBar>
              <div class="mt-3 text-center">
                <span class="font-medium"
                  >{{
                    parseFloat(this.currentServer.stats.usedDisk).toFixed(2)
                  }}
                  GB</span
                >
                used of
                <span class="font-medium">
                  {{
                    parseFloat(this.currentServer.stats.totalDisk).toFixed(2)
                  }}
                  GB
                </span>
              </div>
            </div>
          </div>
          <div class="pt-5 border border-l-0 border-t-0 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 class="px-2 pb-2 text-center font-medium inline-block">
              Uptime
            </h3>
            <div class="p-4 text-center">
              {{ this.currentServer.stats.uptime }}
            </div>
          </div>
          <div class="pt-5 pb-10 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h3 class="p-2 text-center font-medium inline-block">Load Avg</h3>
            <div class="p-4 text-center">
              {{ this.currentServer.stats.loadavg }}
            </div>
          </div>
          <div class="pt-5 border-x text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <h3 class="p-2 text-center font-medium inline-block">CPU</h3>
            <div class="p-4 text-center">
              {{ 100 - this.currentServer.stats.cpuideal }}%
            </div>
          </div>
          <div class="pt-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 382.169 382.169"
              style="enable-background: new 0 0 382.169 382.169"
              xml:space="preserve"
              class="w-5 h-5 inline-block"
            >
              <path
                d="M191.084 0C85.72 0 0 85.72 0 191.084s85.72 191.084 191.084 191.084c105.365 0 191.084-85.72 191.084-191.084S296.449 0 191.084 0zm175.914 183.584H328.06c-.993-36.182-9.156-70.613-23.534-100.029a192.868 192.868 0 0 0 15.227-12.542c27.801 29.773 45.416 69.163 47.245 112.571zM235.969 59.18c-4.794-16.515-10.369-29.696-16.591-39.397 26.124 8.974 49.019 30.085 65.649 58.963a174.14 174.14 0 0 1-40.454 18.847c-2.344-13.848-5.222-26.76-8.604-38.413zm-5.927 42.353a177.336 177.336 0 0 1-38.954 4.31 177.346 177.346 0 0 1-38.961-4.312C161.302 46.523 177.969 15 191.084 15c13.116 0 29.783 31.523 38.958 86.533zm-84.7 82.051c.281-24.778 1.945-47.273 4.571-67.176a192.538 192.538 0 0 0 41.175 4.435 192.53 192.53 0 0 0 41.168-4.434c2.626 19.903 4.289 42.398 4.571 67.174h-91.485zm91.485 15c-.281 24.78-1.945 47.277-4.572 67.182a192.526 192.526 0 0 0-41.167-4.433 192.535 192.535 0 0 0-41.174 4.435c-2.627-19.906-4.291-42.403-4.572-67.184h91.485zM162.792 19.783c-6.222 9.701-11.797 22.882-16.591 39.397-3.383 11.653-6.26 24.563-8.603 38.41a174.148 174.148 0 0 1-40.453-18.846c16.629-28.877 39.524-49.987 65.647-58.961zm-27.475 92.819c-2.988 22.089-4.69 46.115-4.976 70.983H69.115c.988-33.82 8.617-65.203 21.057-91.497a189.048 189.048 0 0 0 45.145 20.514zm-4.975 85.982c.286 24.871 1.988 48.9 4.977 70.991a188.978 188.978 0 0 0-45.144 20.513c-12.442-26.296-20.072-57.681-21.06-91.504h61.227zm7.257 86.002c2.343 13.844 5.22 26.752 8.602 38.403 4.794 16.515 10.369 29.696 16.591 39.397-26.121-8.974-49.015-30.082-65.644-58.955a174.153 174.153 0 0 1 40.451-18.845zm14.529-3.94a177.328 177.328 0 0 1 38.959-4.312c13.263 0 26.309 1.465 38.953 4.31-9.176 55.005-25.841 86.525-38.956 86.525-13.115 0-29.78-31.52-38.956-86.523zm67.249 81.74c6.222-9.701 11.797-22.882 16.591-39.396 3.382-11.651 6.26-24.56 8.602-38.405a174.16 174.16 0 0 1 40.452 18.845c-16.629 28.873-39.523 49.982-65.645 58.956zm27.474-92.813c2.988-22.09 4.69-46.118 4.976-70.989h61.227c-.988 33.822-8.618 65.206-21.059 91.502a188.981 188.981 0 0 0-45.144-20.513zm4.976-85.989c-.285-24.867-1.987-48.893-4.975-70.981a188.905 188.905 0 0 0 45.146-20.515c12.44 26.294 20.068 57.676 21.056 91.496h-61.227zm57.226-123.109a177.92 177.92 0 0 1-11.698 9.701 187.254 187.254 0 0 0-8.51-13.23c-6.429-9.109-13.402-17.199-20.816-24.221a176.75 176.75 0 0 1 41.024 27.75zM93.324 56.946a186.77 186.77 0 0 0-8.51 13.23 177.938 177.938 0 0 1-11.7-9.7 176.752 176.752 0 0 1 41.027-27.751c-7.415 7.021-14.387 15.112-20.817 24.221zM62.415 71.014a192.87 192.87 0 0 0 15.229 12.54c-14.378 29.416-22.542 63.847-23.535 100.03H15.171C17 140.176 34.615 100.786 62.415 71.014zm-47.244 127.57h38.938c.993 36.185 9.158 70.619 23.537 100.036a192.828 192.828 0 0 0-15.227 12.539C34.616 281.386 17 241.995 15.171 198.584zm57.948 123.113a177.872 177.872 0 0 1 11.698-9.698 187.575 187.575 0 0 0 8.507 13.225c6.429 9.108 13.401 17.199 20.816 24.22a176.774 176.774 0 0 1-41.021-27.747zm215.725 3.527a187.228 187.228 0 0 0 8.508-13.225 177.625 177.625 0 0 1 11.697 9.7 176.743 176.743 0 0 1-41.02 27.746c7.414-7.023 14.386-15.113 20.815-24.221zm30.905-14.064a192.827 192.827 0 0 0-15.226-12.54c14.38-29.417 22.544-63.851 23.537-100.035h38.938c-1.829 43.411-19.446 82.802-47.249 112.575z"
              />
            </svg>

            <h3 class="p-2 text-center font-medium inline-block">Bandwidth</h3>
            <div class="p-4 text-center">
              {{ this.currentServer.stats.bandwidth }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-white mt-5 shadow rounded">
      <div class="flex flex-row items-center justify-between">
        <h2 class="p-5 font-semibold text-xl inline-block">Sites</h2>
        <router-link
          :to="'/server/' + this.$route.params.serverid + '/sites'"
          class="m-4 text-indigo-800 font-medium hover:underline hover:underline-offset-1"
          >View All</router-link
        >
      </div>
      <DataTable
        :value="sites"
        class="p-datatable-lg"
        :rowHover="true"
        dataKey="siteId"
        selectionMode="single"
        @rowSelect="onSiteRowSelect"
      >
        <template #empty>
          <div class="">"No Sites available"</div>
        </template>

        <Column
          field="name"
          header="Name"
          headerStyle="background-color:#eff3f8;"
          bodyClass="font-bold "
        >
        </Column>
        <Column
          field="domain"
          header="Primary Domain"
          headerStyle="background-color:#eff3f8;"
          bodyClass=""
        >
          <template #body="{ data }">
            {{ data.domain.primary.url }}
          </template>
        </Column>
        <Column
          field="user"
          header="User"
          headerStyle="background-color:#eff3f8;"
        >
        </Column>
        <Column
          field="php"
          header="PHP"
          headerStyle="background-color:#eff3f8;"
        >
        </Column>

        <Column
          field="type"
          header="Environment"
          headerStyle="background-color:#eff3f8;"
          bodyClass="w-[5%] text-center"
        >
          <template #body="{ data }">
            <tag v-if="data.type == 'live'" value="Live"></tag>
            <tag
              v-if="data.type == 'staging'"
              value="staging"
              severity="warning"
            ></tag>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import ProgressBar from "primevue/progressbar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import siteList from "../mixins/siteList";
export default {
  mixins: [siteList],
  components: { ProgressBar, DataTable, Column, Tag },
  data() {
    return {
      resourceError: false,
      serverInfo: [
        { source: "CPU", value: "1 vCPU" },
        { source: "RAM", value: "1 GB" },
        { source: "Disk", value: "25GB" },
        { source: "Provider", value: "DO" },
        { source: "Location", value: "Bangalore" },
      ],
    };
  },

  computed: {
    sites() {
      return this.$store.state.sites[this.$route.params.serverid];
    },
    currentServer() {
      return this.$store.state.currentServer;
    },
    percentMemory() {
      return Math.round(
        (this.currentServer.stats.usedMemory /
          this.currentServer.stats.totalMemory) *
          100
      );
    },
    percentDisk() {
      return Math.round(
        (parseFloat(this.currentServer.stats.usedDisk) /
          parseFloat(this.currentServer.stats.totalDisk)) *
          100
      );
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.p-datatable .p-datatable-tbody > tr:focus) {
  outline: none;
  outline-offset: -0.15rem;
}
.p-tag {
  margin-left: 25%;
  // display: table;
  // margin: 0 auto;
}
.Server {
  &_info {
    padding: 1rem;
    padding-left: 0;
    display: flex;
  }
  &_cpu {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  &_memory {
    flex: 1;
  }
  &_disk {
    flex: 1;
  }
  &_band {
    flex: 1;
  }
  &_summary {
    display: grid;
    grid-template-columns: [first] 50% [line2] auto [end];
    grid-template-rows: [row1-start] auto [row1-end] auto [third-line] auto [last-line];
  }
}

.box {
  padding: 1rem;
  margin-right: 1rem;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0px 2px 5px 1px rgba(64, 60, 67, 0.16);
}
.bar {
  width: 100%;
  background-color: #e3e0e0;
  height: 30px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 4px rgba(2, 2, 2, 0.3);
}

.bar_text {
  color: white;
  font-size: var(--font-size-primary);
  display: flex;
  align-items: center;
  float: left;
  flex-direction: row-reverse;
}

.bar_used {
  background-color: royalblue;
  height: 30px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
} /* Green */

.bar_usage {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-primary);
}

.details {
  margin-top: 1rem;
  font-size: 2rem;
  text-align: center;
}

.info {
  display: flex;
  justify-content: space-between;
  &_title {
    font-size: var(--font-size-small-header);
    color: royalblue;
    align-self: center;
    font-weight: bolder;
  }
  &_svg {
    height: 3rem;
    width: 3rem;
  }
}
</style>
