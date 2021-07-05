<template>
  <the-container-grid ref="container" v-if="items.length">
    <the-container-loader
      v-for="(item, index) in items"
      :key="index"
      class="opacity-0 flex flex-col"
      :data-delay="calcDelay(Number(index))"
    >
      <slot :item="item" />
    </the-container-loader>
    <the-button
      v-if="hasMore"
      class="
        btn-lg-border-md
        text-primary
        hover:text-white hover:bg-primary
        col-span-full
        font-opensans
        clamptext-08-12
        py-1
        justify-self-center
      "
      @click.prevent="loadMore"
    >
      Carregar mais items
    </the-button>
  </the-container-grid>
  <the-search-not-found v-else />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { ElementObserver } from "./controller/elementObserver";
import TheContainerGrid from "./TheContainerGrid.vue";
import TheContainerLoader from "./TheContainerLoader.vue";
import TheButton from "../../shared/button/TheButton.vue";
import { getGridColumnsQty } from "../../../helpers/utils";
import TheSearchNotFound from "../search/TheSearchNotFound.vue";

export default defineComponent({
  components: {
    TheContainerGrid,
    TheContainerLoader,
    TheButton,
    TheSearchNotFound,
  },
  emits: ["loadMore"],
  props: {
    items: {
      type: Array,
      default: [],
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
  },
  setup(_, { emit }) {
    const elementObserver = new ElementObserver();
    elementObserver.provide();

    const container = ref<HTMLElement>();

    const calcDelay = (index: number) => {
      const gridQantity = getGridColumnsQty();
      const pos = index % gridQantity;

      return pos * 100;
    };

    const loadMore = () => emit("loadMore");

    return {
      calcDelay,
      loadMore,
      container,
    };
  },
});
</script>

<style lang="postcss"></style>
