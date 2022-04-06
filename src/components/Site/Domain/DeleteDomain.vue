<template>
  <div class="flex flex-col bg-white">
    <div class="flex flex-col text-xl mb-10">
      <p>
        Do you realy want to delete domain <slot name="url"></slot> from
        <slot name="name"></slot> Site
      </p>
    </div>

    <!-- <p v-if="error">{{ error }}</p> -->
  </div>
</template>

<style></style>
