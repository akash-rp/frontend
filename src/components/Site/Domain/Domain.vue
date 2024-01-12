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
                  value=2
                  v-model="addDomain.type"
              />
              <label for="alias" class="text-xl mr-10">Alias</label>
            </div>
            <div class="flex flex-row items-center">
              <input
                  type="radio"
                  id="redirect"
                  class="form-radio h-4 w-4 mr-2"
                  value=3
                  v-model="addDomain.type"
              />
              <label for="redirect" class="text-xl">Redirect</label>
            </div>
          </div>
        </div>
        <!-- <add-domain :site="site"></add-domain> -->
      </a-modal>
      <!-- Wildcard -->
      <a-modal v-model:visible="isShowWildcard" title="Wildcard Settings">
        <wildcard
            :url="wildcard.url"
            :status="!wildcard.status"
            :site="site"
            :type="wildcard.type"
            @close="isShowWildcard = false"
        ></wildcard>
      </a-modal>
      <!-- Body -->
      <div class="flex flex-row justify-between items-center">
        <h1 class="header">Domain</h1>
        <a-button
            type="primary"
            @click="showAddDomain"
        >
          Add Domain
        </a-button>
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
          <tr
              class="row vld-parent"
              v-for="(domain, i) in site.domains"
              :key="domain.url"
          >
            <td class="cell">{{ domain.url }}</td>
            <td class="cell">
              <tag v-if="domain.type === 1">Primary</tag>
              <tag severity="warning" v-if="domain.type === 2">Alias</tag>
            </td>
            <td class="cell">
              <div
                  class="border-2 border-indigo-700 w-fit px-2 -my-2 rounded text-indigo-700 font-medium"
                  v-if="domain.routing === 'root' && domain.type === 1"
                  @click="
                    showRouting(
                      domain.url,
                      domain.routing,
                      domain.subdomain
                    )
                  "
              >
                Root
              </div>
              <div
                  class="border-2 border-indigo-700 w-fit px-2 -my-2 rounded text-indigo-700 font-medium"
                  v-if="domain.routing === 'www' && domain.type === 1"
                  @click="
                    showRouting(
                      domain.url,
                      domain.routing,
                      domain.subdomain
                    )
                  "
              >
                www
              </div>
              <div
                  class="border-2 w-fit px-2 -my-2 rounded text-gray-400 border-gray-400 font-medium"
                  v-if="domain.routing === 'none' && domain.type === 2"
                  @click="showRouting(data.url, data.routing, data.subdomain)"
              >
                none
              </div>
            </td>
            <td class="cell">
              <label class="switch ml-2">
                <input
                    type="checkbox"
                    v-model="site.domains[i].wildcard"
                    @change="showWildcard(domain, domain.type)"
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
              <a-dropdown :trigger="['click']" v-if="domain.type !== 1">
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
                  <a-menu @click="menuClick($event, domain)">
                    <a-menu-item :key=1>
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
                    <a-menu-item :key=2>
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

<script setup>
import {ref, computed, inject, provide} from 'vue';
import Routing from './Routing.vue';
import Tag from 'primevue/tag';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {useStore} from 'vuex';
import DeleteDomain from './DeleteDomain.vue';
import PrimaryDomain from './PrimaryDomain.vue';
import {ModalWrapper} from '../../Modal';

// Data properties
const store = useStore();
const axios = inject('axios');
const toast = inject('toast');
const domainOptionUrl = ref('');
const selectedUrl = ref('');
const routeUrl = ref('');
const selectedRoute = ref('');
const isShowRouting = ref(false);
const isShowAddDomain = ref(false);
const isShowDeleteDomain = ref(false);
const isShowWildcard = ref(false);
const wildcard = ref({url: '', status: '', type: ''});
const isActive = ref(false);
const loader = ref({});
const addDomain = ref({type: 2});
const tempDomain = ref({});
const modal = inject('modal');

// Computed property
const site = computed(() => {
  return store.state.currentSite;
});

// Methods
const menuClick = ({key}, domain) => {
  if (key === 1) {
    makePrimary(domain);
  } else {
    showDeleteDomain(domain);
  }
};

const log = (event) => {
  console.log(event);
};

const showAddDomain = () => {
  isShowAddDomain.value = true;
};

const closeAddDomain = () => {
  addDomain.value.url = '';
  isShowAddDomain.value = false;
};

const showDeleteDomain = (domain) => {
  modal.value = ModalWrapper({
    title: 'Delete Domain',
    component: DeleteDomain,
    componentProps: {domain:domain},
    modal: modal
  });
};

const closeDeleteDomain = () => {
  isShowDeleteDomain.value = false;
  selectedUrl.value = '';
};

const showRouting = (url, route, subDomain) => {
  if (!subDomain) {
    routeUrl.value = url;
    selectedRoute.value = route;
    isShowRouting.value = true;
  //   <routing
  //           :url="routeUrl"
  // :site="site"
  // :selected="selectedRoute"
  // @save="changeRoute"
  //       ></routing>
    modal.value = ModalWrapper({
      title: 'Domain Routing',
      component: Routing,
      componentProps: {url: routeUrl, site: site, selected: selectedRoute},
      modal: modal
    });
  }
};

const showWildcard = (domain, type) => {
  if (!domain.subDomain) {
    wildcard.value.status = domain.wildcard;
    wildcard.value.type = type;
    wildcard.value.id = domain.id;
    isShowWildcard.value = true;
    console.log(wildcard.value);
    domain.wildcard = !domain.wildcard;
  } else {
    domain.wildcard = !domain.wildcard;
  }
};

const changeWildcard = () => {
  let url = wildcard.value.url;
  isShowWildcard.value = false;
  loader.value[wildcard.value.url] = true;
  axios
      .post('/site/' + this.$route.params.siteid + '/wildcard', {
        id: wildcard.value.id,
        wildcard: wildcard.value.status,
        type: wildcard.value.type
      })
      .then((res) => {
        isShowWildcard.value = false;
        store.commit('setCurrentSiteDomain', res.data);
        loader.value[url] = false;
      })
      .catch((error) => {
        console.log(error);
      });
};

const changeRoute = (routeType, url) => {
  axios
      .post('/site/' + site.value.siteId + '/changeRoute', {
        url: url,
        serverid: site.value.serverId,
        type: routeType
      })
      .then(() => {
        if (site.value.domains[0].url == url) {
          site.value.domains[0].routing = routeType;
        } else {
          for (let alias of site.value.domain.alias) {
            if (alias.url == url) {
              alias.routing = routeType;
              break;
            }
          }
        }
        store.commit('setCurrentSiteDomain', site.value);
        isShowRouting.value = false;
      })
      .catch(() => {
        toast.error('Failed to change route');
      });
};

const makePrimary = (domain) => {
  tempDomain.value = domain;
  modal.value = ModalWrapper({
    title: 'Change primary',
    component: PrimaryDomain,
    componentProps: {domain:tempDomain.value, site: store.state.currentSite},
    modal: modal
  });
};

const addDomainFun = () => {
  isShowAddDomain.value = false;

  axios
      .post('/site/' + site.value.id + '/domain', {
        url: addDomain.value.url,
        type: addDomain.value.type
      })
      .then((res) => {
        store.commit('setCurrentSiteDomain', res.data);
        toast.success('Domain added');
      })
      .catch(() => {
        toast.error('Failed to add Domain');
      })
      .finally(() => {
        addDomain.value.url = '';
      });
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
