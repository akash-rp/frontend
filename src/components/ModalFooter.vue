<template>
  <div class="flex gap-3 justify-end">
    <button
        class="py-2 px-4 font-medium border border-black rounded"
        @click="closeModal"
    >
      Cancel
    </button>
    <button
        class="py-2 px-4 text-white rounded pointer"
        :class="props.saveBtnColor === 'warning'? 'bg-red-700' : 'bg-indigo-700'"
        @click="emit('submit')"
        :loading="true"
    >
      {{ props.saveBtnText }}
    </button>
    <Button></Button>
  </div>

</template>
<script setup>
import {inject, defineProps} from 'vue';

const props = defineProps({
  saveBtnText: {
    type: String,
    default: 'Save'
  },
  saveBtnColor: {
    type: String,
    default: 'confirm'
  }
});
const modal = inject('modal');
const axios = inject('axios');
const emit = defineEmits(['submit']);

function closeModal() {
  modal.value.destroy();
}
</script>
