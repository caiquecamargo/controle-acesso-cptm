<template>
  <section
    class="grid items-center justify-center grid-cols-1 lg:grid-cols-slider"
  >
    <span
      class="
        left-0
        hidden
        cursor-pointer
        duration-450
        h-1/2
        top-1/4
        lg:block
        hover:duration-150
        text-true-gray-500
        hover:text-true-gray-700
      "
      v-if="enableControllers"
    >
      <arrow-icon @click.prevent="turn('right')" />
    </span>
    <div
      ref="container"
      class="
        relative
        flex
        items-center
        justify-start
        w-full
        h-full
        mx-auto
        overflow-hidden
        lg:w-full
      "
      :class="[enableControllers ? '' : 'lg:col-start-2']"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <slot />
    </div>
    <span
      class="
        right-0
        hidden
        transform
        rotate-180
        cursor-pointer
        duration-450
        h-1/2
        top-1/4
        lg:block
        hover:duration-150
        text-true-gray-500
        hover:text-true-gray-700
      "
      v-if="enableControllers"
    >
      <arrow-icon @click.prevent="turn('left')" />
    </span>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { HorizontalGallerySliderController } from "./controller/HorizontalGallerySliderController";
import ArrowIcon from "../../svg/ArrowIcon.vue";
import { SliderType } from "./controller/HorizontalSlider";
import { getElement } from "../../../helpers/utils";

export default defineComponent({
  components: {
    ArrowIcon,
  },
  props: {
    visibleElements: {
      type: Number,
    },
    resizeEvent: {
      type: Object,
    },
  },
  setup(props) {
    const container = ref<HTMLElement>();
    let childrens: HTMLElement[] = [];
    let items: HorizontalGallerySliderController[] = [];
    const enableControllers = ref(true);

    const getChildrens = () => {
      const containerElement = getElement(container.value);
      childrens = Array.from(containerElement.children) as HTMLElement[];
    };

    const createItems = () => {
      const visibleElements = props.visibleElements || 3;
      items = childrens.map(
        (item, index, array) =>
          new HorizontalGallerySliderController(
            item as HTMLElement,
            index,
            array.length,
            {
              visibleElements,
            }
          )
      );

      if (items.length === 1) enableControllers.value = false;
    };

    const init = () => {
      getChildrens();
      createItems();
    };

    onMounted(() => {
      init();
    });

    props.resizeEvent?.add(createItems);

    let startPositionX = 0;
    let endPositionX = 0;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      startPositionX = touch.pageX;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      endPositionX = touch.pageX;
      if (enableControllers.value) turnElements();
    };

    const turnElements = () => {
      if (startPositionX - endPositionX > 50)
        items.forEach((item) => item.turn("left"));
      if (startPositionX - endPositionX < -50)
        items.forEach((item) => item.turn("right"));
    };

    const turn = (to: SliderType) => {
      items.forEach((item) => item.turn(to));
    };

    return {
      container,
      turn,
      onTouchStart,
      onTouchEnd,
      init,
      enableControllers,
    };
  },
});
</script>

<style lang="scss"></style>
