<template>
  <div class="flex flex-col bg-white">
    <div class="flex flex-col text-lg mb-10">
      <p>
        Do you really want to delete domain <span class="font-bold">{{ data.domain.url }}</span> from
        <span class="font-bold">{{ store.state.currentSite.name }}</span> Site
      </p>
    </div>
  </div>
  <modal-footer @submit="deleteDomain" save-btn-text="Delete Domain" save-btn-color="warning"></modal-footer>
</template>
<script setup lang="ts">
import {inject, defineProps} from 'vue';
import ModalFooter from '../../ModalFooter.vue';

const {data} = defineProps(['data']);
const axios = inject('axios');
const store = inject('store');
const modal = inject('modal');
const toast = inject('toast');

function deleteDomain() {
  axios.delete('/site/' + store.state.currentSite.id + '/domain/' + data.domain.id)
      .then(() => {
        toast.success('Domain deleted');
        store.commit('deleteDomain', data.domain.id);
        modal.value.destroy();
      })
      .catch((err) => {
        console.log(err)
        toast.error('Failed to delete domain');
      });
}
</script>
