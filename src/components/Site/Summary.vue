<template>
  <h1 class="header">Site Summary</h1>
  <div v-if="data.domain" class="info">
    <div class="para">
      <p class="site_lt">Primary Domain:</p>
      <p class="site_rt">{{ data.domain.primary.url }}</p>
    </div>
    <div class="para">
      <p class="site_lt">User:</p>
      <p class="site_rt">{{ data.user }}</p>
    </div>
    <div class="para">
      <p class="site_lt">PHP Version:</p>
      <p class="site_rt">{{ data.php }}</p>
    </div>
    <div class="para">
      <p class="site_lt">Root Path:</p>
      <p class="site_rt">
        /home/{{ data.user }}/{{ data.name }}/{{ data.rootPath }}
      </p>
    </div>
    <div class="para">
      <p class="site_lt">Public Path:</p>
      <p class="site_rt">
        /home/{{ data.user }}/{{ data.name }}/{{ data.publicPath }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.state.currentSite;
    },
  },
};
</script>

<style lang="scss" scoped>
.site {
  &_lt {
    display: inline-block;
    width: 25%;
    font-size: var(--font-size-primary);
    color: dimgray;
    font-weight: bold;
  }
  &_rt {
    display: inline-block;
    font-size: var(--font-size-primary);
  }
}
.info {
  margin-top: 2rem;
}

.para {
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
}
.para:last-child {
  border-bottom: none;
}
</style>
