<template>
  <div
    class="w-full p-4 transition duration-200 rounded shadow-md cursor-pointer h-full hover:scale-[1.01] grid grid-rows-[1fr_3rem] gap-2 text-primary"
    @click="routeTo"
  >
    <div class="flex items-center justify-center p-8">
      <slot name="image" />
    </div>

    <div
      class="flex items-center justify-center text-lg font-semibold text-center"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { RouteLocationRaw, useRouter } from "vue-router";
const props = defineProps({
  to: {
    type: Object as PropType<RouteLocationRaw>,
  },
});
const router = useRouter();
const routeTo = () => {
  if (props.to) router.push(props.to);
};
</script>

<style lang="postcss" scoped></style>
