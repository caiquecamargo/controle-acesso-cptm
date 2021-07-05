<template>
  <nav
    class="absolute top-0 left-0 flex flex-col items-start w-3/4 h-full gap-6 py-5 pt-4 bg-current"
    ref="navMenu"
  >
    <slot />
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { AnimeMenu } from "./controllers/AnimeMenu";
import { AnimationController } from "../../../controllers/AnimationController";
import { onClickOutside } from "../../../helpers/utils";

export default defineComponent({
  emits: ["click-outside"],
  setup(_, { emit }) {
    const navMenu = ref((null as unknown) as HTMLElement);
    let animationController = new AnimationController<AnimeMenu>();
    let firstClick = true;

    onMounted(() => {
      animationController.animation = new AnimeMenu(navMenu.value);
    });

    const isClickedOutside = (element: HTMLElement) =>
      onClickOutside(element, navMenu.value) && !firstClick;

    const closeOnClickOutside = (event: Event) => {
      event.preventDefault();
      const element = event.target as HTMLElement;

      if (isClickedOutside(element)) emit("click-outside");
      firstClick = false;
    };

    watch(
      () => animationController.state,
      () => {
        firstClick = true;
        if (animationController.isOpened())
          document.addEventListener("click", closeOnClickOutside);
        else document.removeEventListener("click", closeOnClickOutside);
      }
    );

    return {
      animationController,
      navMenu,
      closeOnClickOutside,
    };
  },
});
</script>

<style lang="scss"></style>
