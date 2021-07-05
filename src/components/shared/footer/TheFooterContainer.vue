<template>
  <article
    class="container grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-12"
  >
    <slot />
  </article>
</template> 

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="postcss" scoped>
</style>