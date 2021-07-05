<template>
  <section
    class="container grid items-center justify-center grid-cols-1 grid-flow-row px-3 py-10 lg:py-20 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
  >
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="postcss"></style>
