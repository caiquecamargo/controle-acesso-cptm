<template>
  <div
    class="lds-dual-ring inline-block w-4 h-4 after:content-[''] after:block after:w-full after:h-full after:rounded-full after:border-[length:var(--loader-width)] after:border-[color:var(--loader-color)] after:border-y-transparent after:animate-[loader_var(--loader-animation-time)_linear_infinite]"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  color: {
    type: String,
    default: "white",
  },
  loaderWidth: {
    type: String,
    default: "2px",
  },
  animationTime: {
    type: Number,
    default: 800,
  },
});
const time = computed(() => `${props.animationTime}ms`);
</script>

<style scoped>
.lds-dual-ring {
  --loader-width: v-bind(loaderWidth);
  --loader-color: v-bind(color);
  --loader-animation-time: v-bind(time);
}
</style>
