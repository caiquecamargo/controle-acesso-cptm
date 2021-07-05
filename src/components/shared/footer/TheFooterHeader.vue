<template>
  <header class="mx-auto mt-10 text-center text-white mb-14 clamptext-11-14">
    {{ title }}
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
</style>