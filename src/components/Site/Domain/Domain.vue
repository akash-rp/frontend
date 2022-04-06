<template>
  <div class="main_bg">
    <div class="domain" @click.self="closeDeleteDomain" v-if="site.name">
      <!-- Add Domain -->
      <a-modal
        v-model:visible="isShowAddDomain"
        title="Add Domain"
        style="border-radius: 1rem"
      >
        <template #footer>
          <button
            class="py-2 px-4 font-medium border border-black rounded"
            @click="closeAddDomain"
          >
            Cancel
          </button>
          <button
            class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
            @click="addDomainFun"
          >
            Add Domain
          </button>
        </template>
        <div class="flex flex-col">
          <label for="url" class="font-semibold mb-3">Domain Name</label>
          <input
            type="text"
            id="url"
            class="p-2 border border-gray-600 rounded"
            v-model="addDomain.url"
            ref="input"
          />
        </div>
        <div class="flex flex-col mt-5">
          <label class="font-semibold mb-2">Domain Type</label>
          <div class="flex flex-row">
            <div class="flex flex-row items-center">
              <input
                type="radio"
                id="alias"
                class="form-radio h-4 w-4 mr-2"
                value="alias"
                v-model="addDomain.type"
              />
              <label for="alias" class="text-xl mr-10">Alias</label>
            </div>
            <div class="flex flex-row items-center">
              <input
                type="radio"
                id="redirect"
                class="form-radio h-4 w-4 mr-2"
                value="redirect"
                v-model="addDomain.type"
              />
              <label for="redirect" class="text-xl">Redirect</label>
            </div>
          </div>
        </div>
        <!-- <add-domain :site="site"></add-domain> -->
      </a-modal>
      <!-- Delete Domain -->
      <a-modal v-model:visible="isShowDeleteDomain" title="Delete Domain">
        <template #footer>
          <button
            class="py-2 px-4 font-medium border border-black rounded"
            @click="closeDeleteDomain"
          >
            Cancel
          </button>
          <button
            class="py-2 px-4 bg-red-700 text-white rounded pointer"
            @click="deleteDomain"
          >
            Delete Domain
          </button>
        </template>
        <delete-domain
          @delete="deleteDomain"
          @cancel="isShowDeleteDomain == false"
        >
          <template #url>
            <p class="inline font-bold">{{ url }}</p></template
          >
          <template #name
            ><p class="inline font-bold">{{ site.name }}</p></template
          >
        </delete-domain>
      </a-modal>
      <!-- Routing -->
      <a-modal v-model:visible="isShowRouting" title="Domain Routing">
        <routing
          :url="routeUrl"
          :site="site"
          :selected="selectedRoute"
          @save="changeRoute"
        ></routing>
      </a-modal>
      <!-- Wildcard -->
      <a-modal v-model:visible="isShowWildcard" title="Wildcard Settings">
        <template #footer>
          <button
            class="py-2 px-4 font-medium border border-black rounded"
            @click="isShowWildcard = false"
          >
            Cancel
          </button>
          <button
            class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
            @click="changeWildcard"
          >
            Add Wildcard
          </button>
        </template>
        <wildcard
          :url="wildcard.url"
          :status="!wildcard.status"
          :site="site"
          :type="wildcard.type"
          @close="isShowWildcard = false"
        ></wildcard>
      </a-modal>
      <!-- change Primary -->
      <a-modal
        v-model:visible="isShowPrimary"
        width="600px"
        title="Primary Domain"
      >
        <template #footer>
          <button
            class="py-2 px-4 font-medium border border-black rounded"
            @click="isShowPrimary = false"
          >
            Cancel
          </button>
          <button
            class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
            @click="changePrimary"
          >
            Change Primary
          </button>
        </template>
        <primary
          @close="isShowPrimary = false"
          :primaryUrl="toPrimaryUrl"
        ></primary>
      </a-modal>
      <!-- Body -->
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
              <td class="cell"><tag>Primary</tag></td>
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
              <td class="cell"><tag severity="warning">Alias</tag></td>
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
              <td>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link" @click.prevent>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </a>
                  <template #overlay>
                    <a-menu @click="menuClick($event, domain.url)">
                      <a-menu-item key="1">
                        <div class="flex flex-row text-indigo-700 py-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 mr-2 text-indigo-700"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                          </svg>
                          Make Primary
                        </div>
                      </a-menu-item>
                      <a-menu-item key="2">
                        <div class="flex flex-row text-red-700 py-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete Domain
                        </div>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
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
import Routing from "./Routing.vue";
import Wildcard from "./Wildcard.vue";
import Primary from "./Primary.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import InputSwitch from "primevue/inputswitch";
import Loading from "vue-loading-overlay";
import { Modal } from "ant-design-vue";
import "ant-design-vue/lib/modal/style/index.css";
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
      addDomain: {
        type: "alias",
      },
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
    Routing,
    Wildcard,
    Primary,
    DataTable,
    Column,
    Tag,
    InputSwitch,
    Loading,
    AModal: Modal,
  },
  methods: {
    menuClick({ key }, url) {
      if (key == 1) {
        this.makePrimary(url);
      } else {
        this.showDeleteDomain(url);
      }
    },
    changePrimary() {
      this.isShowPrimary = false;
      this.$axios
        .post("http://localhost/site/" + this.site.siteId + "/changePrimary", {
          url: this.toPrimaryUrl,
          serverid: this.site.serverId,
        })
        .then(() => {
          let tempSite = this.site.domain.primary;
          this.site.domain.primary = this.site.domain.alias.find((ali) => {
            if (ali.url == this.toPrimaryUrl) return ali;
          });
          this.site.domain.alias = this.site.domain.alias.filter(
            (ali) => ali.url != this.toPrimaryUrl
          );
          this.site.domain.alias.push(tempSite);
          this.$toast.success("Successfully changed primary url");
        })
        .catch(() => {
          this.$toast.error("Failed to change primary url");
        });
    },
    log(event) {
      console.log(event);
    },

    showAddDomain() {
      this.isShowAddDomain = true;
    },
    closeAddDomain() {
      this.addDomain.url = "";
      this.isShowAddDomain = false;
    },

    showDeleteDomain(selectedUrl) {
      this.domainOptionUrl = "";
      this.isShowDeleteDomain = true;
      this.selectedUrl = selectedUrl;
    },
    closeDeleteDomain() {
      this.isShowDeleteDomain = false;
      this.selectedUrl = "";
    },
    deleteDomain() {
      let deleteUrl = this.selectedUrl;
      console.log(deleteUrl, this.site.serverId);
      this.closeDeleteDomain();
      this.loader[deleteUrl] = true;

      this.$axios
        .post("/site/" + this.site.siteId + "/deleteDomain", {
          url: deleteUrl,
          serverid: this.site.serverId,
        })
        .then(() => {
          this.site.domain.alias = this.site.domain.alias.filter((ali) => {
            if (ali.url !== deleteUrl) {
              return ali;
            }
          });
          this.$toast.success("Domain deleted");
        })
        .catch(() => {
          this.$toast.error("Failed to delete domain");
        })
        .finally(() => {
          this.loader[deleteUrl] = false;
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
      console.log(type);
      if (!domain.isSubDomain) {
        this.wildcard.url = domain.url;
        this.wildcard.status = domain.wildcard;
        this.wildcard.type = type;
        this.isShowWildcard = true;
        console.log(this.wildcard);
        domain.wildcard = !domain.wildcard;
      }
    },
    changeWildcard() {
      let url = this.wildcard.url;
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
          this.loader[url] = false;
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
      this.toPrimaryUrl = url;
      this.isShowPrimary = true;
    },
    addDomainFun() {
      this.isShowAddDomain = false;

      this.$axios
        .post("/site/" + this.site.siteId + "/addDomain", {
          url: this.addDomain.url,
          type: this.addDomain.type,
          id: this.site.serverId,
        })
        .then((res) => {
          this.$store.commit("setCurrentSite", res.data);
          this.$toast.success("Domain added");
        })
        .catch(() => {
          this.$toast.error("Failed to add Domain");
        })
        .finally(() => {
          this.addDomain.url = "";
        });
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
