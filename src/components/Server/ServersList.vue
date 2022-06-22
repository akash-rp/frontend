<template>
  <div class="flex flex-row">
    <h1 class="text-3xl font-medium py-4">Servers</h1>
  </div>
  <div class="bg-white shadow">
    <DataTable
      :value="servers"
      class="p-datatable-lg"
      :globalFilterFields="['name', 'location', 'ip']"
      v-model:filters="filters1"
      :rowHover="true"
      dataKey="serverId"
      selectionMode="single"
      @rowSelect="onRowSelect"
    >
      <template #empty>
        <div class="">
          {{ empty }}
        </div>
      </template>
      <template #header>
        <div
          class="flex justify-end bg-white"
          headstyle="background-color:white"
        >
          <div
            class="relative text-gray-600 focus-within:text-indigo-800 text-gray-400"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              type="search"
              name="q"
              class="py-2 text-sm text-black rounded-md pl-10 focus:bg-white focus:text-gray-900 focus:ring focus:outline-none focus:ring-1 focus:ring-indigo-800 ring-1 ring-gray-400"
              placeholder="Search"
              autocomplete="off"
              v-model="filters1['global'].value"
            />
          </div>
        </div>
      </template>
      <Column
        field="provider"
        header=""
        bodyStyle="padding-right:0px;"
        headerStyle="background-color:#eff3f8"
      >
        <template #body="{ data }">
          <img
            :src="'/assets/providers/' + data.provider + '.svg'"
            :alt="data.provider"
            height="20"
            width="20"
            :class="{ uc: data.provider == 'UC' }"
          />
        </template>
      </Column>
      <Column
        field="name"
        header="Name"
        bodyStyle="padding-left:0px;width:25%"
        headerStyle="padding-left:0px;background-color:#eff3f8;"
        bodyClass="font-bold"
      >
      </Column>
      <Column
        field="location"
        header="Location"
        headerStyle="background-color:#eff3f8;"
      ></Column>

      <Column
        field="ip"
        header="IP"
        headerStyle="background-color:#eff3f8;"
        style="width: 20%"
      >
        <template #body="{ data }">
          <div class="flex flex-row items-center">
            {{ data.ip }}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"
                />
                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
              </svg>
            </span>
          </div>
        </template>
      </Column>
      <Column
        field="ram"
        header="RAM"
        headerStyle="background-color:#eff3f8;"
      ></Column>
      <Column
        field="cpu"
        header="CPU"
        headerStyle="background-color:#eff3f8;"
      ></Column>
      <Column
        field="sites"
        header="Sites"
        headerStyle="background-color:#eff3f8;"
      ></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import shared from "../mixins/serverList";
export default {
  mixins: [shared],
  data() {
    return {
      filters1: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      copy: "",
      error: "",
      providerImg: "",
      empty: "No server available",
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getServersList();
  },
  components: { DataTable, Column },
  methods: {
    onRowSelect(event) {
      this.$router.push("/server/" + event.data.serverId);
      // this.$store.commit("setCurrentServer", event.data);
    },
  },
  computed: {
    servers() {
      return this.$store.state.servers;
    },
  },
  watch: {
    filters1: {
      deep: true,
      handler(data) {
        if (data.global.value !== null && data.global.value !== "") {
          this.empty = "No server found for this filter";
        } else {
          this.empty = "No server available";
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.p-datatable) {
  .p-datatable-header {
    background-color: white;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
}

.uc {
  margin-right: -15px;
  margin-left: -10px;
  margin-top: -15px;
  margin-bottom: -15px;
  width: 40px;
  height: 40px;
}

:deep(.p-datatable .p-datatable-tbody > tr:focus) {
  outline: none;
  outline-offset: -0.15rem;
}
// .servers {
//   padding: 2rem 5rem;

//   &__padding {
//     padding: 2rem;
//   }

//   &__main {
//     display: flex;
//   }
// }

// .title {
//   font-size: 4rem;

//   &__button {
//     background-color: var(--color-primary);
//     color: white;
//     width: 12rem;
//     margin-left: 2rem;
//     border-radius: 5px;
//     border: none;
//     font-size: var(--font-size-primary);
//     font-weight: 600;
//     cursor: pointer;
//   }
// }

// .create-server {
//   background-color: var(--color-primary);
//   display: grid;
//   align-items: center;
//   justify-content: center;
//   border-radius: 5px;
//   box-shadow: 5px 5px 5px #888888;
//   flex-direction: column;
//   cursor: pointer;

//   &:hover {
//     box-shadow: 2px 2px 2px #888888;
//   }

//   &__svg {
//     width: 13rem;
//     height: 13rem;
//     align-self: end;
//     fill: white;
//   }

//   &__p {
//     color: white;
//     font-size: var(--font-size-primary);
//     margin-top: 0rem;
//   }
// }

// .svr {
//   display: flex;
//   border-radius: 5px;
//   cursor: pointer;
//   background-color: white;
//   box-shadow: 0px 1px 4px #888888;
//   margin-bottom: 1rem;
//   height: 6rem;
//   width: 50%;

//   & > * {
//     padding: 1rem;
//   }
//   &__list {
//     display: flex;
//     flex-direction: column;
//   }
//   &__name {
//     font-size: var(--font-size-header);
//     text-transform: capitalize;
//     display: flex;
//     align-items: center;
//   }

//   &__prov {
//   }

//   &__ip {
//     display: flex;
//     align-items: center;
//     font-size: var(--font-size-primary);
//   }
//   &__image {
//     height: 5rem;
//     display: flex;
//     align-self: center;
//     width: 5rem;
//   }
// }
</style>
