<template>
  <header class="text-center uppercase font-opensans font-bold my-4">
    <h2 v-if="title" class="clamptext-15-25">{{ title }}</h2>
    <p v-if="subtitle" class="clamptext-1-15">
      {{ subtitle }}
    </p>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    subtitle: String,
  },
});
</script>

<style lang="scss">
</style>