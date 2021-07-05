<template>
  <div
    ref="floatButton"
    class="float-button"
    @mouseenter="animationController.onMouseEnter"
    @mouseleave="animationController.onMouseLeave"
    @click.prevent="swapState"
  >
    <portfolio-icon v-if="!isOpen" />
    <x-icon v-else />
  </div>
  <the-float-menu class="float-menu" ref="floatMenu" @click-outside="swapState">
    <!-- <filter-menu @close-menu="swapState" /> -->
  </the-float-menu>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { AnimeFloatButton } from "./controllers/AnimeFloatButton";
import PortfolioIcon from "../../svg/FacebookIcon.vue";
import XIcon from "../../svg/XIcon.vue";
// import FilterMenu from "../../app/menu/FilterMenu.vue";
import TheFloatMenu from "../menu/TheFloatMenu.vue";
import { AnimationFloatController } from "./controllers/AnimationFloatController";

export default defineComponent({
  components: {
    PortfolioIcon,
    XIcon,
    // FilterMenu,
    TheFloatMenu,
  },
  setup() {
    const floatMenu = ref<InstanceType<typeof TheFloatMenu>>();
    const floatButton = ref<HTMLElement>();
    const animationController = new AnimationFloatController();

    onMounted(() => {
      if (floatButton.value)
        animationController.animation = new AnimeFloatButton(floatButton.value);

      setTimeout(() => animationController.animation?.animate(), 2000);
    });

    const isOpen = computed(() => animationController.isOpened());

    const swapState = async () => {
      animationController.onClick();
      floatMenu.value?.animationController.swap();
    };

    return {
      floatMenu,
      floatButton,
      animationController,
      swapState,
      isOpen,
    };
  },
});
</script>

<style lang="scss">
</style>