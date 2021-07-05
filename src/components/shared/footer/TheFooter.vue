<template>
  <footer class="w-full bg-primary">
    <the-footer-container>
      <slot />
      <the-footer-developer-description />
    </the-footer-container>
  </footer>
</template> 

<script lang="ts">
import { defineComponent } from "vue";
import TheFooterDeveloperDescription from "./TheFooterDeveloperDescription.vue";
import TheFooterContainer from "./TheFooterContainer.vue";

export default defineComponent({
  components: {
    TheFooterDeveloperDescription,
    TheFooterContainer,
  },
});
</script>

<style lang="postcss" scoped>
</style>