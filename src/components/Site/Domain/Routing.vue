<template>
  <div class="flex flex-col">
    <div class="text-2xl mb-2">
      <span>Add Routing to domain </span
      ><span class="font-bold">{{ url }}</span>
    </div>
    <div class="flex flex-col">
      <label class="text-2xl font-semibold">Routing Type</label>
      <div class="flex flex-row items-center">
        <input
          type="radio"
          id="alias"
          class="form-radio h-4 w-4 mr-2"
          value="none"
          v-model="type"
        />
        <label for="alias" class="text-2xl font-medium">None</label>
      </div>
      <div class="flex flex-row items-center">
        <input
          type="radio"
          id="redirect"
          class="form-radio h-4 w-4 mr-2"
          value="www"
          v-model="type"
        />
        <label for="redirect" class="text-2xl font-medium mr-2">www</label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          class="mr-1 fill-current text-gray-600"
        >
          <path
            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"
          />
        </svg>
        <p class="text-xl text-gray-600">( non-www to www )</p>
      </div>
      <div class="flex flex-row items-center">
        <input
          type="radio"
          id="redirect"
          class="form-radio h-4 w-4 mr-2"
          value="root"
          v-model="type"
        />
        <label for="redirect" class="text-2xl font-medium mr-2">Root</label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          class="mr-1 fill-current text-gray-600"
        >
          <path
            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"
          />
        </svg>
        <p class="text-xl text-gray-600">( www to non-www )</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["url", "site", "selected"],
  data() {
    return {
      type: "",
    };
  },
  created() {
    this.type = this.selected;
  },
  methods: {
    changeRoute() {
      if (this.type != this.selected) {
        this.$emit("save", this.type, this.url);
      }
    },
  },
};
</script>

<style></style>
