<template>
  <section
    class="container relative z-10 grid items-center justify-center grid-cols-1 grid-flow-row px-3 py-10 lg:py-20 mx-auto lg:grid-cols-2 lg:grid-rows-1 gap-10"
  >
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="postcss"></style>
