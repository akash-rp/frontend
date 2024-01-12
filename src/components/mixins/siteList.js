export default {
  methods: {
    onSiteRowSelect(event) {
      console.log(event)
      this.$router.push("/site/" + event.data.id);
      this.$store.commit("setCurrentSite", event.data);
    },
  },
};
