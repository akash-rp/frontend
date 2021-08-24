<template>
  <div class="table table_sites">
    <div class="table_title">SITES</div>
    <div class="row header">
      <div class="cell cell-header cell-site">Site</div>
      <div class="cell cell-header cell-domain">Domain</div>
      <div class="cell cell-header cell-user">User</div>
    </div>
    <div class="row" v-for="site in sites" v-bind:key="site.siteId">
      <div class="cell cell-site">{{ site.name }}</div>
      <div class="cell cell-domain">{{ site.domain.primary.url }}</div>
      <div class="cell cell-user">{{ site.user }}</div>
    </div>
  </div>
  <div class="table_ssh table">
    <div class="table_title">SSH LOGIN</div>
    <div class="row header">
      <div class="cell cell-header cell-site">User</div>
      <div class="cell cell-header cell-domain">IP Address</div>
      <div class="cell cell-header cell-user">Status</div>
    </div>
    <div class="row">
      <div class="cell cell-site">Akash</div>
      <div class="cell cell-domain">134.209.150.115</div>
      <div class="cell cell-user">Active</div>
    </div>
    <div class="row">
      <div class="cell cell-site">Kashu</div>
      <div class="cell cell-domain">134.209.150.115</div>
      <div class="cell cell-user">kashu</div>
    </div>

    <div class="row">
      <div class="cell cell-site">Tur tur</div>
      <div class="cell cell-domain">134.209.150.115</div>
      <div class="cell cell-user">hrushi</div>
    </div>

    <div class="row">
      <div class="cell cell-site">Google</div>
      <div class="cell cell-domain">134.209.150.115</div>
      <div class="cell cell-user">kashu</div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.fetchSitesSummary();
  },
  data() {
    return {
      sites: [],
      error: "",
    };
  },
  methods: {
    fetchSitesSummary() {
      fetch("http://localhost/sitesummary/" + this.$route.params.serverid, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.server = "";
            this.error = data.error;
            return;
          }
          this.sites = data;
        })
        .catch((err) => {
          this.server = "";
          this.error = err;
        });
    },
  },
  watch: {
    "$route.params.serverid"() {
      this.fetchSitesSummary();
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  background: white;
  border-radius: 3px;
  box-shadow: 0px 2px 5px 1px rgba(64, 60, 67, 0.16);
  margin-top: 1rem;
  &_title {
    font-size: var(--font-size-small-header);
    padding: 0.5rem 1rem;
    color: royalblue;
    line-height: 4rem;
    font-weight: bolder;
  }
  &_sites {
    grid-row: 1/2;
    grid-column: 1/2;
    margin-right: 2rem;
  }
  &_ssh {
    margin-right: 2rem;
  }
}

.cell {
  font-size: var(--font-size-primary);
  display: inline-block;
  padding: 1rem;
  &-site {
    width: 30%;
  }
  &-domain {
    width: 50%;
  }
  &-user {
    width: 20%;
  }
}

.cell-header {
}

.header {
  background-color: whitesmoke;
  color: gray;
}

.row {
  border-bottom: 2px solid #e4e1e1;
}

.row:last-child {
  border-bottom: 0;
}
</style>
