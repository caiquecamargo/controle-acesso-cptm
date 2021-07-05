<template>
  <picture>
    <source
      v-if="srcset.minimal"
      :srcset="srcset.minimal"
      media="(max-width: 800px)"
      width="800"
      height="400"
    />
    <source
      v-if="srcset.medium"
      :srcset="srcset.medium"
      media="(max-width: 1000px)"
      width="1000"
      height="450"
    />
    <source
      v-if="srcset.large"
      :srcset="srcset.large"
      media="(max-width: 1200px)"
      width="1200"
      height="500"
    />
    <source
      v-if="srcset.huge"
      :srcset="srcset.huge"
      media="(min-width: 1200px)"
      width="1200"
      height="500"
    />
    <img
      class="object-cover w-full min-h-full"
      v-if="srcset.default"
      :src="srcset.default"
      alt="banner"
    />
  </picture>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ISrcset } from "./model/ISrcset";

export default defineComponent({
  props: {
    alt: {
      type: String,
      default: "",
    },
    srcset: {
      type: Object as PropType<ISrcset>,
      required: true,
    },
  },
});
</script>

<style lang="postcss"></style>
