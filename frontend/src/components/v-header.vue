<template>
  <header
    class="fixed top-0 left-0 z-40 flex items-center justify-between w-full gap-2 p-2 min-h-10 bg-gradient-to-r from-primary to-primary-dark text-white"
  >
    <div class="flex items-center justify-start flex-grow-0 md:min-w-[20%]">
      <router-link :to="{ name: 'home' }">
        <icon-local-cptm class="h-6" />
      </router-link>
    </div>

    <div v-if="$slots.center" class="flex items-center justify-center flex-1">
      <slot name="center" />
    </div>

    <div class="flex items-center justify-end flex-grow-0 md:min-w-[20%]">
      <v-menu-aside-button />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "OrionHeader",
});
</script>
