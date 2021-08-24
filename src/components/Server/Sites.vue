<template>
  <div class="main main_bg">
    <h2 class="header">Sites</h2>
    <router-link
      class="Sites_add"
      :to="/server/ + this.$route.params.serverid + /addsite/"
      >Add Site</router-link
    >
    <p class="tagline">All Sites of this server are shown here.</p>
    <div class="Sites_table">
      <div class="Sites_table_row_header ">
        <div class="Sites_table_cell site_name site_header">Site Name</div>
        <div class="Sites_table_cell site_domain site_header">Domain</div>
        <div class="Sites_table_cell site_user site_header">User</div>
        <div class="Sites_table_cell site_ssl site_header">SSL</div>
        <div class="Sites_table_cell site_php site_header">PHP Version</div>
      </div>
      <div
        class="Sites_table_row "
        v-for="site in sites[this.$route.params.serverid]"
        v-bind:key="site.siteId"
      >
        <div class="Sites_table_cell site_name site_bold">
          <router-link :to="/site/ + site.siteId" class="site_url">{{
            site.name
          }}</router-link>
        </div>
        <div class="Sites_table_cell site_domain site_bold">
          <a
            :href="'http://' + site.domain.primary.url"
            class="site_url"
            target="_blank"
            >{{ site.domain.primary.url }}</a
          >
        </div>
        <div class="Sites_table_cell site_user">{{ site.user }}</div>
        <div class="Sites_table_cell site_ssl">
          {{ site.domain.primary.ssl }}
        </div>
        <div class="Sites_table_cell site_php">{{ site.php }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["server"],
  created() {
    this.$store.dispatch("getSites", { route: this.$route });
  },

  watch: {
    "$route.params.serverid"() {
      if (this.$route.params.serverid == undefined) {
        return;
      }
      this.$store.dispatch("getSites", { route: this.$route });
    },
  },
  computed: {
    sites() {
      return this.$store.state.sites;
    },
  },
};
</script>

<style lang="scss">
.Sites {
  &_header {
    display: inline-block;
    font-size: var(--font-size-header);
  }
  &_add {
    float: right;
    border: none;
    background-color: royalblue;
    padding: 1rem;
    border-radius: 3px;
    color: white;
    font-size: var(--font-size-primary);
    text-decoration: none;
  }
  
  &_table_row {
    padding: 2rem 0;
    border-bottom: 2px solid #e4e1e1;
    &:last-child {
      border-bottom: none;
    }
    &_header {
      border-bottom: 3px solid #e4e1e1;
      padding-bottom: 1rem;
    }
  }
}

.site {
  &_name {
    width: 20%;
  }
  &_domain {
    width: 30%;
  }
  &_user {
    width: 10%;
  }
  &_ssl {
    width: 10%;
  }
  &_php {
    width: 10%;
  }
  &_header {
    color: dimgray;
  }
  &_bold {
    color: royalblue;
    font-weight: bold;
  }
  &_url {
    text-decoration: none;
    color: royalblue;
  }
}

.Sites_table {
  margin-top: 2rem;
  font-size: var(--font-size-primary);
  &_row {
    color: inherit;
  }
  &_cell {
    display: inline-block;
  }
}
</style>
