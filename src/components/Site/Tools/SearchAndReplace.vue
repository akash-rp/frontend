<template>
  <div>
    <a-form
      class="px-5"
      :model="search"
      name="searchReplace"
      autocomplete="off"
      id="searchReplace"
      :hideRequiredMark="true"
      @finish="searchAndReplace"
      layout="vertical"
    >
      <a-form-item
        label="Search"
        name="search"
        class="grow"
        :rules="[{ required: true, message: 'Please enter string to search' }]"
      >
        <a-input
          type="text"
          id="search"
          class="p-2 border rounded"
          v-model:value="search.search"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="Replace"
        name="replace"
        :rules="[{ required: true, message: 'Please enter string to replace' }]"
      >
        <a-input
          type="text"
          id="replace"
          class="p-2 border rounded"
          v-model:value="search.replace"
        ></a-input>
      </a-form-item>
      <a-alert
        description="Search and replace operation performs in all tables. If the search string matches the site URL then the URL changes, don't forget to change the primary domain, or else other operations will fail to work correctly."
        type="warning"
        showIcon
      />
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        search: "",
        replace: "",
      },
    };
  },
  methods: {
    searchAndReplace() {
      this.$axios
        .post("/site/" + this.$route.params.siteid + "/searchReplace", {
          ...this.search,
        })
        .then((res) => {
          this.$toast.success("Search and replace operation succesfull");
        })
        .catch(() => {
          this.$toast.error("Search and replace operation failed");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
