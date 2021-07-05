<template>
  <the-header>
    <template #logo>
      <the-button-link-internal :to="{ name: 'Home' }">
        <cptm-logo class="w-28 text-white" />
      </the-button-link-internal>
    </template>
    <template #navMobile>
      <e-nav-mobile />
    </template>
  </the-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "../shared/header/TheHeader.vue";
import ENavMobile from "./ENavMobile.vue";
import CptmLogo from "../svg/CptmLogo.vue";
import TheButtonLinkInternal from "../shared/button/TheButtonLinkInternal.vue";

export default defineComponent({
  components: { TheHeader, ENavMobile, CptmLogo, TheButtonLinkInternal },
});
</script>

<style lang="postcss"></style>
