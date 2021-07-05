<template>
  <section
    class="grid items-center justify-center text-current grid-cols-1 gap-10 lg:grid-cols-3 font-opensans clamptext-085-12 leading-loose"
  >
    <div v-if="hasFirst" :class="{ ...grid, major: major === 'First' }">
      <slot name="first" />
    </div>
    <div v-if="hasSecond" :class="{ ...grid, major: major === 'Second' }">
      <slot name="second" />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    hasFirst: {
      type: Boolean,
      default: true,
    },
    hasSecond: {
      type: Boolean,
      default: true,
    },
    major: {
      type: String as PropType<"First" | "Second">,
      default: "Second",
      validator: (value: string) => ["First", "Second"].indexOf(value) !== -1,
    },
  },
  setup(props) {
    const grid = computed(() => {
      return {
        "col-span-full":
          (props.hasFirst && !props.hasSecond) ||
          (!props.hasFirst && props.hasSecond),
      };
    });

    return {
      grid,
    };
  },
});
</script>

<style lang="postcss">
.major {
  @apply col-span-2;
}
</style>
