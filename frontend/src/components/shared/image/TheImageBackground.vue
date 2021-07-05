<template>
  <div class="absolute inset-0 z-0">
    <the-picture v-if="srcset" :srcset="srcset" :alt="alt" />
    <img
      class="object-cover min-w-full min-h-full"
      v-if="src"
      :src="src"
      :alt="alt"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ISrcset } from "./model/ISrcset";
import ThePicture from "./ThePicture.vue";

export default defineComponent({
  components: { ThePicture },
  props: {
    srcset: {
      type: Object as PropType<ISrcset>,
    },
    src: {
      type: String,
    },
    alt: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="postcss"></style>
