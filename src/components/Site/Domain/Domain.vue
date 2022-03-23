<template>
  <div class="main_bg">
    <div class="domain" @click.self="closeDeleteDomain" v-if="site.name">
      <add-domain
        v-if="isShowAddDomain"
        @close="CloseAddDomain"
        :site="site"
      ></add-domain>
      <!-- Delete Domain -->
      <delete-domain
        v-if="isShowDeleteDomain"
        @close="closeDeleteDomain"
        @delete="deleteDomain"
      >
        <template #url>
          <p class="inline font-bold">{{ url }}</p></template
        >
        <template #name
          ><p class="inline font-bold">{{ site.name }}</p></template
        >
      </delete-domain>
      <!-- Routing -->
      <routing
        v-if="isShowRouting"
        @close="isShowRouting = false"
        :url="routeUrl"
        :site="site"
        :selected="selectedRoute"
        @save="changeRoute"
      ></routing>
      <wildcard
        @close="isShowWildcard = false"
        v-if="isShowWildcard"
        :url="wildcard.url"
        :status="!wildcard.status"
        :site="site"
        @confirm="changeWildcard"
      ></wildcard>
      <primary
        v-if="isShowPrimary"
        @close="isShowPrimary = false"
        :primaryUrl="toPrimaryUrl"
      ></primary>
      <div class="flex flex-row justify-between items-center">
        <h1 class="header">Domain</h1>
        <button
          class="p-2 bg-indigo-700 text-white font-semibold rounded-md mr-5"
          @click="showAddDomain"
        >
          Add Domain
        </button>
      </div>
      <div class="px-5 pb-5">
        <p class="tagline">
          All domains connected to this site are shown below
        </p>
      </div>
      <div class="">
        <table class="w-full list">
          <thead class="">
            <tr style="background-color: #eff3f8" class="text-left row">
              <th class="cell">Domain Name</th>
              <th class="cell">Domian Type</th>
              <th class="cell">Routing</th>
              <th class="cell">Wildcard</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row vld-parent">
              <td class="cell">{{ site.domain.primary.url }}</td>
              <td class="cell"><tag value="Primary" /></td>
              <td class="cell">
                <div
                  class="border-2 border-indigo-700 w-fit px-2 -my-2 rounded text-indigo-700 font-medium"
                  v-if="site.domain.primary.routing === 'root'"
                  @click="
                    showRouting(
                      site.domain.primary.url,
                      site.domain.primary.routing,
                      site.domain.primary.subdomain
                    )
                  "
                >
                  Root
                </div>
                <div
                  class="border-2 border-indigo-700 w-fit px-2 -my-2 rounded text-indigo-700 font-medium"
                  v-if="site.domain.primary.routing === 'www'"
                  @click="
                    showRouting(
                      site.domain.primary.url,
                      site.domain.primary.routing,
                      site.domain.primary.subdomain
                    )
                  "
                >
                  www
                </div>
              </td>
              <td class="cell flex flex-row items-center">
                <label class="switch ml-2">
                  <input
                    type="checkbox"
                    v-model="site.domain.primary.wildcard"
                    @change="showWildcard(site.domain.primary, 'primary')"
                  />
                  <span class="slider round"></span>
                </label>
                <div class="" v-if="loader[site.domain.primary.url] == true">
                  <Loading
                    class="hidden"
                    active="true"
                    :is-full-page="isActive"
                    height="40"
                    width="40"
                    color="#4f46e5"
                    z-index="0"
                    loader="dots"
                  />
                </div>
              </td>
            </tr>
            <tr
              class="row vld-parent"
              v-for="(domain, i) in site.domain.alias"
              :key="domain.url"
            >
              <td class="cell">{{ domain.url }}</td>
              <td class="cell"><tag value="Alias" severity="warning" /></td>
              <td class="cell">
                <div
                  class="border-2 w-fit px-2 -my-2 rounded text-gray-400 border-gray-400 font-medium"
                  v-if="domain.routing === 'none'"
                  @click="showRouting(data.url, data.routing, data.subdomain)"
                >
                  none
                </div>
              </td>
              <td class="cell">
                <label class="switch ml-2">
                  <input
                    type="checkbox"
                    v-model="site.domain.alias[i].wildcard"
                    @change="showWildcard(domain, 'alias')"
                  />
                  <span class="slider round"></span>
                </label>
                <div class="" v-if="loader[domain.url] == true">
                  <Loading
                    class="hidden"
                    active="true"
                    :is-full-page="isActive"
                    height="40"
                    width="40"
                    color="#4f46e5"
                    z-index="0"
                    loader="dots"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteDomain from "./DeleteDomain.vue";
import AddDomain from "./AddDomain.vue";
import DomainRow from "./DomainRow.vue";
import Routing from "./Routing.vue";
import Wildcard from "./Wildcard.vue";
import Primary from "./Primary.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import InputSwitch from "primevue/inputswitch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    return {
      domainOptionUrl: "",
      selectedUrl: "",
      routeUrl: "",
      selectedRoute: "",
      isShowRouting: false,
      isShowAddDomain: false,
      isShowDeleteDomain: false,
      isShowWildcard: false,
      isShowPrimary: false,
      wildcard: { url: "", status: "", type: "" },
      toPrimaryUrl: "",
      active: false,
      isActive: false,
      loader: {},
    };
  },
  computed: {
    site() {
      return this.$store.state.currentSite;
    },
  },
  components: {
    AddDomain,
    DeleteDomain,
    DomainRow,
    Routing,
    Wildcard,
    Primary,
    DataTable,
    Column,
    Tag,
    InputSwitch,
    Loading,
  },
  methods: {
    log(event) {
      console.log(event);
    },

    showAddDomain() {
      this.isShowAddDomain = true;
    },
    CloseAddDomain() {
      this.isShowAddDomain = false;
    },

    showDeleteDomain(selectedUrl) {
      this.domainOptionUrl = "";
      this.isShowDeleteDomain = true;
      this.selectedUrl = selectedUrl;
    },
    closeDeleteDomain() {
      this.isShowDeleteDomain = false;
    },
    deleteDomain() {
      let deleteUrl = this.selectedUrl;
      console.log(deleteUrl, this.site.serverId);
      fetch("http://localhost/site/" + this.site.siteId + "/deleteDomain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: deleteUrl,
          serverid: this.site.serverId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            console.log(data.error);
          } else {
            this.site.domain.alias = this.site.domain.alias.filter((ali) => {
              if (ali.url !== deleteUrl) {
                return ali;
              }
            });
            this.isShowDeleteDomain = false;
          }
        });
    },
    showOption(url) {
      if (this.domainOptionUrl == url) {
        this.domainOptionUrl = "";
      } else if (url) {
        this.domainOptionUrl = url;
      }
    },
    showRouting(url, route, subDomain) {
      if (!subDomain) {
        this.routeUrl = url;
        this.selectedRoute = route;
        this.isShowRouting = true;
      }
    },
    showWildcard(domain, type) {
      if (!domain.isSubDomain) {
        this.wildcard.url = domain.url;
        this.wildcard.status = domain.wildcard;
        this.wildcard.type = type;
        this.isShowWildcard = true;
        domain.wildcard = !domain.wildcard;
      }
    },
    changeWildcard() {
      this.isShowWildcard = false;
      this.loader[this.wildcard.url] = true;
      this.$axios
        .post("/site/" + this.$route.params.siteid + "/wildcard", {
          serverid: this.site.serverId,
          url: this.wildcard.url,
          wildcard: this.wildcard.status,
          type: this.wildcard.type,
        })
        .then((res) => {
          this.isShowWildcard = false;
          this.$store.commit("setCurrentSite", res.data);
          this.loader[this.wildcard.url] = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeRoute(routeType, url) {
      fetch("http://localhost/site/" + this.site.siteId + "/changeRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          serverid: this.site.serverId,
          type: routeType,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            if (this.site.domain.primary.url == url) {
              this.site.domain.primary.routing = routeType;
            } else {
              for (let alias of this.site.domain.alias) {
                if (alias.url == url) {
                  alias.routing = routeType;
                  break;
                }
              }
            }
            this.$store.commit("setCurrentSite", this.site);
            this.isShowRouting = false;
          }
        });
    },
    makePrimary(url) {
      console.log("make-primary", url);
      this.toPrimaryUrl = url;
      this.isShowPrimary = true;
    },
  },
};
</script>

<style lang="scss">
.switch {
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 1.75rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  background-color: #ccc;
  transition: 0.4s;
  -webkit-transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.25rem;
  width: 1.25rem;
  left: 0.25rem;
  margin-top: -0.625rem;
  background-color: white;
  transition: 0.4s;
  -webkit-transition: 0.4s;
  top: 50%;
}

input:checked + .slider {
  background-color: #4f46e5;
}
input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:hover + .slider + input:checked {
  background-color: #4338ca;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1.25rem);
  -ms-transform: translateX(1.25rem);
  transform: translateX(1.25rem);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
.name {
  width: 30%;
}
.type {
  width: 10%;
  &_btn {
    background: royalblue;
    padding: 5px 7px;
    display: block;
    width: 66px;
    color: white;
    border-radius: 3px;
  }
}
.dns {
  width: 5%;
}
.ssl {
  width: 10%;
}
.routing {
  width: 15%;
}
.wildcard {
  width: 10%;
}
.int {
  width: 10%;
}

.nopointer {
  cursor: not-allowed;
}
table.list {
  table-layout: auto;
  width: 100%;
}
</style>
