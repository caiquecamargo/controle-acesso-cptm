<template>
  <div class="cursor-pointer mr-4" ref="button">
    <div class="h-1 w-7 mb-1 rounded bg-current"></div>
    <div class="h-1 w-7 mb-1 rounded bg-current"></div>
    <div class="h-1 w-7 rounded bg-current"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { AnimationController } from "../../../controllers/AnimationController";
import { AnimeSandwich } from "./controllers/AnimeSandwich";

export default defineComponent({
  setup() {
    const button = ref(null as unknown as HTMLElement);
    let animationController = new AnimationController<AnimeSandwich>();

    onMounted(() => {
      animationController.animation = new AnimeSandwich(button.value);
    });

    return {
      button,
      animationController,
    };
  },
});
</script>
