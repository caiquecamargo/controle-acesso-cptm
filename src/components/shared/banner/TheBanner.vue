<template>
  <div ref="banner" class="relative w-full overflow-hidden h-45vw">
    <the-image-background :srcset="srcset" :alt="alt || 'banner-background'" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import { ISrcset } from "../image/model/ISrcset";
import { HeaderObserverKey } from "../header/controllers/HeaderObserver";
import TheImageBackground from "../image/TheImageBackground.vue";
import { injectStrict } from "../../../helpers/utils";

export default defineComponent({
  components: { TheImageBackground },
  props: {
    srcset: {
      type: Object as PropType<ISrcset>,
      required: true,
    },
    alt: {
      type: String,
    },
  },
  setup() {
    const banner = ref(null as unknown as HTMLElement);
    const headerObserver = injectStrict(HeaderObserverKey);

    onMounted(() => {
      headerObserver.observe(banner.value);
    });

    return {
      banner,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
