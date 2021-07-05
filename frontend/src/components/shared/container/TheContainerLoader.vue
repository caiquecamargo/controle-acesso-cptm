<template>
  <div ref="element">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Observer } from "../../../controllers/Observer";
import { getElement, injectStrict } from "../../../helpers/utils";
import { elementObserverKey } from "./controller/elementObserver";

export default defineComponent({
  setup() {
    const observer = injectStrict<Observer>(elementObserverKey);
    const element = ref<HTMLElement>();

    onMounted(() => {
      const elementValue = getElement(element.value);
      observer.observe(elementValue);
    });

    return {
      element,
    };
  },
});
</script>

<style lang="postcss"></style>
