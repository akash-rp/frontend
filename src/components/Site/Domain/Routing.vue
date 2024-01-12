<template>
  <div class="flex flex-col">
    <div class="text-lg mb-2">
      <span>Add routing to domain </span><span class="font-bold">{{ data.url }}</span>
    </div>

    <div class="flex flex-col">
      <label class="text-lg font-semibold">Routing Type</label>

      <div class="flex flex-row items-center">
        <input
            type="radio"
            id="www"
            class="form-radio h-4 w-4 mr-2"
            value="www"
            v-model="type"
        />
        <label for="www" class="text-lg mr-2">www</label>
        <a-tooltip placement="right">
          <template #title>
            non-www to www
          </template>
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
        </a-tooltip>
        <p class="text-lg text-gray-600"></p>
      </div>

      <div class="flex flex-row items-center">
        <input
            type="radio"
            id="root"
            class="form-radio h-4 w-4 mr-2"
            value="root"
            v-model="type"
        />
        <label for="root" class="text-lg mr-2">Root</label>
        <a-tooltip placement="right">
          <template #title>www to non-www</template>
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
        </a-tooltip>
      </div>
    </div>

    <modal-footer @submit="changeRoute"></modal-footer>
  </div>
</template>

<script setup>
import ModalFooter from '../../ModalFooter.vue';

const {data} = defineProps(['data']);
const type = data.selected;

const changeRoute = () => {
  console.log(type);
  // Your implementation for the changeRoute method
};
</script>

<style></style>
