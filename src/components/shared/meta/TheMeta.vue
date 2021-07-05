<template>
  <teleport to="head">
    <title>{{ siteName }} || {{ page }}</title>
    <meta name="description" :content="description" data-meta="name" />
    <meta
      property="og:title"
      :content="`${siteName} || ${page}`"
      data-meta="title"
    />
    <meta property="og:type" content="website" data-meta="type" />
    <meta
      property="og:description"
      :content="description"
      data-meta="description"
    />
    <meta property="og:url" :content="path" data-meta="url" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  props: {
    page: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  setup() {
    const siteName = import.meta.env.VITE_SITE_NAME;

    const route = useRoute();
    const path = route.fullPath;

    return {
      siteName,
      path,
    };
  },
});
</script>

<style lang="postcss"></style>
