<template>
  <div class="Sites_table_cell name font-bold">
    <a :href="'http://' + site.url" target="_blank" class="site_url">{{
      site?.url
    }}</a>
  </div>

  <div class="Sites_table_cell type text-center">
    <span
      v-if="type == 'alias'"
      class="inline-flex items-center justify-center text-xl font-semibold leading-none bg-green-700 rounded py-3 px-8 text-white"
      >Alias</span
    >
    <span
      v-if="type == 'primary'"
      class="inline-flex items-center justify-center text-xl font-semibold leading-none bg-indigo-700 rounded py-3 px-5 text-white"
      >Primary</span
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
    <svg
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      class="w-12 inline-block h-10"
    >
      <path
        d="M36,29v17H13V29H36 M36,27H13c-1.1,0-2,0.9-2,2v17c0,1.1,0.9,2,2,2h23c1.1,0,2-0.9,2-2V29C38,27.9,37.1,27,36,27L36,27z"
      />
      <path
        d="M24.5,16c4.136,0,7.5,3.364,7.5,7.5V27h-2v-3.5c0-2.981-2.519-5.5-5.5-5.5S19,20.519,19,23.5V27h-2v-3.5C17,19.364,20.364,16,24.5,16 M24.5,14c-5.23,0-9.5,4.27-9.5,9.5V29h19v-5.5C34,18.27,29.73,14,24.5,14L24.5,14z M21,27v-3.5c0-1.9,1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5V27H21L21,27z"
      />
      <path
        fill="none"
        stroke="red"
        stroke-miterlimit="10"
        stroke-width="2"
        d="M27 36.5c0-1.381-1.119-2.5-2.5-2.5S22 35.119 22 36.5c0 .815.396 1.532 1 1.989V40.5c0 .825.675 1.5 1.5 1.5s1.5-.675 1.5-1.5v-2.011C26.604 38.032 27 37.315 27 36.5zM12 22.5L12 22.5c0 .825-.675 1.5-1.5 1.5h-5C4.675 24 4 23.325 4 22.5v0C4 21.675 4.675 21 5.5 21h5C11.325 21 12 21.675 12 22.5zM45 22.5L45 22.5c0 .825-.675 1.5-1.5 1.5h-5c-.825 0-1.5-.675-1.5-1.5v0c0-.825.675-1.5 1.5-1.5h5C44.325 21 45 21.675 45 22.5zM39.094 8.906L39.094 8.906c.583.583.583 1.538 0 2.121l-3.536 3.536c-.583.583-1.538.583-2.121 0v0c-.583-.583-.583-1.538 0-2.121l3.536-3.536C37.556 8.322 38.511 8.322 39.094 8.906zM15.562 14.562L15.562 14.562c-.583.583-1.538.583-2.121 0l-3.536-3.536c-.583-.583-.583-1.538 0-2.121l0 0c.583-.583 1.538-.583 2.121 0l3.536 3.536C16.146 13.025 16.146 13.979 15.562 14.562zM24.5 11L24.5 11c-.825 0-1.5-.675-1.5-1.5v-5C23 3.675 23.675 3 24.5 3h0C25.325 3 26 3.675 26 4.5v5C26 10.325 25.325 11 24.5 11z"
      />
    </svg>
  </div>
  <div v-if="site.ssl" class="Sites_table_cell ssl text-center">
    <span
      class="inline-flex items-center justify-center text-xl font-semibold leading-none bg-green-700 rounded py-3 px-5 text-white"
      >On</span
    >
  </div>

  <div class="Sites_table_cell routing text-center">
    <span
      class="p-2 w-36 inline-block text-black shadow-inner rounded"
      :class="{
        'nopointer bg-gray-200': site.subDomain || type == 'alias',
        'cursorPointer bg-gray-300': !site.subDomain || type !== 'alias',
      }"
      @click="checkRouting"
    >
      {{ site.routing }}
    </span>
  </div>
  <div
    class="Sites_table_cell wildcard text-center"
    @click="this.$emit('wildcard', site.url, site.wildcard, site.subDomain)"
  >
    <span
      class="inline-flex items-center justify-center text-xl leading-none rounded py-3 px-5"
      :class="{
        'bg-green-700 text-white font-semibold ':
          this.site.wildcard && !this.site.subDomain,
        'bg-red-700 text-white font-semibold ':
          !this.site.wildcard && !this.site.subDomain,
        'bg-gray-200 text-black': this.site.subDomain,
        nopointer: site.subDomain,
        cursorPointer: !site.subDomain,
      }"
    >
      {{ wildcard }}
    </span>
  </div>

  <div
    class="Sites_table_cell menu text-center inline-block relative"
    v-if="type !== 'primary'"
  >
    <div
      class="absolute w-60 bg-white right-full flex flex-col justify-around shadow-md rounded bottom-0"
      :id="site.url"
      v-if="menu == site.url"
    >
      <button
        class="p-5 border-b hover:bg-gray-100 text-indigo-700"
        @click="this.$emit('showPrimary', site.url)"
      >
        Make Primary
      </button>
      <button
        class="p-5 hover:bg-gray-100 text-red-700"
        @click.stop="this.$emit('alert', site.url)"
      >
        Delete Domain
      </button>
    </div>

    <svg
      @click.stop="this.$emit('showOption', site.url)"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      class="cursor-pointer"
    >
      <path
        d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: ["site", "menu", "type"],
  emits: ["showOption", "alert", "route", "wildcard", "showPrimary"],
  data() {
    return {};
  },
  computed: {
    wildcard() {
      return this.site.wildcard ? "On" : "Off";
    },
  },
  methods: {
    checkRouting() {
      if (this.type !== "alias" || !this.site.subDomain)
        this.$emit(
          "route",
          this.site.url,
          this.site.routing,
          this.site.subDomain
        );
    },
  },
};
</script>

<style>
.cursorPointer {
  cursor: pointer;
}
</style>
