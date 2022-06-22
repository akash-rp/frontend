export default {
  methods: {
    onSiteRowSelect(event) {
      this.$router.push("/site/" + event.data.siteId);
      this.$store.commit("setCurrentSite", event.data);
    },
  },
};
