<template>
  <img loading="lazy" class="w-full object-cover" :src="src" :alt="description" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    src: String,
    description: String,
  },
});
</script>