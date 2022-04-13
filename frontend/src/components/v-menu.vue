<template>
  <Menu class="w-full" as="nav">
    <MenuItems static class="flex flex-col gap-2 mt-2 focus:outline-none">
      <slot />
    </MenuItems>
  </Menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "OrionMenu",
});
</script>

<style lang="postcss" scoped></style>
