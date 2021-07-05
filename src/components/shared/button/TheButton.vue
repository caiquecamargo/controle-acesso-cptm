<template>
  <button :class="isActive ? active : notActive">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheButton",
  props: {
    active: {
      type: String,
      default: "",
    },
    notActive: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
