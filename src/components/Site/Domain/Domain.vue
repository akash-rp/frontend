<template>
  <div class="domain" @click.self="closeDeleteDomain" v-if="site.name">
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
      :url="wildcardUrl"
      :status="wildcardstatus"
      :site="site"
    ></wildcard>
    <primary
      v-if="isShowPrimary"
      @close="isShowPrimary = false"
      :primaryUrl="toPrimaryUrl"
    ></primary>
    <h1 class="header">Domain</h1>
    <button
      class="float-right p-4 bg-indigo-700 text-white font-semibold text-xl rounded-md"
      @click="showAddDomain"
    >
      Add Domain
    </button>
    <add-domain
      v-if="isShowAddDomain"
      @close="CloseAddDomain"
      :site="site"
    ></add-domain>
    <p class="tagline">All Domains connected to this site are shown below</p>
    <div class="Sites_table" v-if="site">
      <div class="Sites_table_row_header ">
        <div class="Sites_table_cell name site_header">DOMAIN NAME</div>
        <div class="Sites_table_cell type site_header text-center">TYPE</div>
        <div class="Sites_table_cell dns site_header text-center">DNS</div>
        <div class="Sites_table_cell int site_header text-center">
          INTEGRATION
        </div>
        <div class="Sites_table_cell ssl site_header text-center">SSL</div>
        <div class="Sites_table_cell routing site_header text-center">
          ROUTING
        </div>
        <div class="Sites_table_cell wildcard site_header text-center">
          WILDCARD
        </div>
      </div>
      <!------------------------ Primary Domain row-------------------------->
      <div
        class="Sites_table_row flex items-center"
        v-if="site.domain.primary.url"
      >
        <domain-row
          :site="site.domain.primary"
          @showOption="showOption"
          :menu="domainOptionUrl"
          @alert="showDeleteDomain"
          type="primary"
          @route="showRouting"
          @wildcard="showWildcard"
        ></domain-row>
      </div>
      <!------------------------------------------Alias row domain--------------------------------->
      <div
        class="Sites_table_row flex items-center"
        v-for="site of site.domain.alias"
        v-bind:key="site.url"
      >
        <domain-row
          :site="site"
          @showOption="showOption"
          :menu="domainOptionUrl"
          @alert="showDeleteDomain"
          type="alias"
          @route="showRouting"
          @wildcard="showWildcard"
          @showPrimary="makePrimary"
        ></domain-row>
      </div>
      <!--####################################### Redirect row domain ########################################3 -->
      <div
        class="Sites_table_row "
        v-for="site of site.domain.redirect"
        v-bind:key="site.url"
      >
        <div class="Sites_table_cell name">
          <a :href="'http://' + site.url" class="site_url">{{ site?.url }}</a>
        </div>
        <div class="Sites_table_cell type text-center">
          <span
            class="inline-flex items-center justify-center text-xl font-semibold leading-none bg-pink-700 rounded py-3 px-4 text-white"
            >Redirect</span
          >
        </div>
        <div class="Sites_table_cell dns text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 inline-block"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"
            />
          </svg>
        </div>
        <div class="Sites_table_cell int text-center">None</div>

        <div v-if="!site.ssl" class="Sites_table_cell ssl text-center">
          <span
            class="inline-flex items-center justify-center text-xl font-semibold leading-none bg-red-700 rounded py-3 px-5 text-white"
            >Off</span
          >
        </div>
        <div v-if="site.ssl" class="Sites_table_cell ssl text-center">
          <span
            class="inline-flex items-center justify-center text-xl font-semibold leading-none bg-green-700 rounded py-3 px-5 text-white"
            >On</span
          >
        </div>

        <div class="Sites_table_cell routing text-center">none</div>
        <div class="Sites_table_cell wildcard text-center">OFF</div>
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
      wildcardUrl: "",
      wildcardstatus: "",
      toPrimaryUrl: "",
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
  },
  methods: {
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
    showWildcard(url, wildcard, subDomain) {
      if (!subDomain) {
        this.wildcardUrl = url;
        this.wildcardstatus = wildcard;
        this.isShowWildcard = true;
      }
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
</style>
