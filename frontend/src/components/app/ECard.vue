<template>
  <router-link
    class="
      grid grid-rows-card
      gap-4
      p-10
      rounded-md
      bg-secondary
      w-full
      h-45vh
      cursor-pointer
      shadow-md
    "
    :to="{ name: to }"
  >
    <slot name="icon" />
    <slot name="name" />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="postcss"></style>
