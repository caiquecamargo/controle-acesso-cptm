<template>
  <nav class="flex items-center justify-center text-white">
    <the-button-sandwich
      class="text-white"
      ref="buttonSandwich"
      @click.prevent="swapState"
    />
    <the-float-menu ref="navMenu" @click-outside="close">
      <slot />
    </the-float-menu>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import TheButtonSandwich from "../button/TheButtonSandwich.vue";
import TheFloatMenu from "../menu/TheFloatMenu.vue";

export default defineComponent({
  components: {
    TheButtonSandwich,
    TheFloatMenu,
  },
  setup() {
    const navMenu = ref<InstanceType<typeof TheFloatMenu>>();
    const buttonSandwich = ref<InstanceType<typeof TheButtonSandwich>>();

    const router = useRouter();
    watch(
      () => router.currentRoute.value.path,
      () => {
        close();
      }
    );

    const close = () => {
      navMenu.value?.animationController.close();
      buttonSandwich.value?.animationController.close();
    };

    const swapState = async () => {
      navMenu.value?.animationController.swap();
      buttonSandwich.value?.animationController.swap();
    };

    return {
      navMenu,
      buttonSandwich,
      swapState,
      close,
    };
  },
});
</script>

<style lang="postcss"></style>
