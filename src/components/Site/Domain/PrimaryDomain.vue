<template>
    <div class="flex flex-col rounded">
      <div class="mb-5 text-lg">
        <span class="inline">Do you want to </span>
        <span class="inline">make </span>
        <span class="inline-block font-bold">{{ props.data.domain.url }}</span>
        <span class="inline"> as Primary Domain for site </span>
        <span class="inline font-bold">{{ props.data.site.name }}</span>
      </div>
    </div>
  <modal-footer @submit="changePrimary"></modal-footer>
</template>

<script setup lang="ts">
import {inject, defineProps} from 'vue';
import ModalFooter from '../../ModalFooter.vue';

const props = defineProps(['data']);
const axios = inject('axios');
function changePrimary() {
  console.log(axios);
}
</script>
