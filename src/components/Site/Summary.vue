<template>
  <h1 class="header border-b">Site Details</h1>
  <table>
    <tr>
      <td class="">Domain</td>
      <td>{{ data.domain.primary.url }}</td>
    </tr>
    <tr>
      <td class="">Public path</td>
      <td>/home/{{ data.user }}/{{ data.name }}/public</td>
    </tr>
  </table>
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

<style lang="scss"></style>
