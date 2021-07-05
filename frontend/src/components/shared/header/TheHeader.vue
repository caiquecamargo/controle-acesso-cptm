<template>
  <header
    ref="header"
    class="
      fixed
      z-50
      flex
      justify-between
      w-full
      h-10
      px-3
      py-2
      lg:h-16
      lg:px-5
      lg:py-3
      bg-primary
    "
  >
    <slot name="logo" />
    <the-header-nav-mobile v-if="mobile">
      <slot name="navMobile" />
    </the-header-nav-mobile>
    <the-header-nav v-else>
      <slot name="nav" />
    </the-header-nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TheHeaderNav from "./TheHeaderNav.vue";
import TheHeaderNavMobile from "./TheHeaderNavMobile.vue";

export default defineComponent({
  components: {
    TheHeaderNav,
    TheHeaderNavMobile,
  },
  setup() {
    const header = ref(null as unknown as HTMLElement);
    const mobile = ref(true);

    return {
      mobile,
      header,
      close,
    };
  },
});
</script>
