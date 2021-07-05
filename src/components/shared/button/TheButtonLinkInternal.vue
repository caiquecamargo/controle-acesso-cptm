<template>
  <router-link
    :to="to"
    class="duration-450 hover:duration-150"
    :class="activeClasses"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { LocationAsRelativeRaw, useRoute } from "vue-router";
import { isMobile } from "../../../helpers/utils";

export default defineComponent({
  props: {
    to: {
      type: Object as PropType<LocationAsRelativeRaw>,
      required: true,
    },
    active: {
      type: String,
      default: "",
    },
    mobileActive: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const route = useRoute();

    const isActive = () => {
      return route.name === props.to.name;
    };

    const activeClasses = computed(() => {
      return [
        isActive() && props.active,
        isActive() && isMobile() && props.mobileActive,
      ];
    });

    return { activeClasses };
  },
});
</script>
