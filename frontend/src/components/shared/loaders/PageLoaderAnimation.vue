<template>
  <div
    class="
      absolute
      inset-0
      z-0
      bg-transparent
      flex flex-col
      justify-center
      items-center
    "
    v-show="show"
  >
    <span ref="text"><slot /></span>
    <span ref="circle" class="w-3 h-3 rounded-full bg-primary"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { PageLoaderAnime } from "./controllers/pageLoaderAnime";
import { TextLoaderAnime } from "./controllers/textLoaderAnime";

export default defineComponent({
  setup() {
    const show = ref(false);
    const text = ref<HTMLElement>();
    const circle = ref<HTMLElement>();
    let textAnimation: TextLoaderAnime;
    let circleAnimation: PageLoaderAnime;

    onMounted(() => {
      if (circle.value) circleAnimation = new PageLoaderAnime(circle.value);

      if (text.value && text.value?.firstElementChild) {
        textAnimation = new TextLoaderAnime(
          TextLoaderAnime.prepareLettersToAnimate(
            text.value.firstElementChild as HTMLElement
          )
        );
      }
    });

    const animate = () => {
      show.value = true;
      textAnimation?.animate();
      circleAnimation?.animate();
    };

    const stop = () => {
      setTimeout(() => {
        textAnimation?.stop();
        circleAnimation?.stop();
        show.value = false;
      }, 1500);
    };

    const router = useRouter();
    router.beforeEach(() => {
      animate();
      stop();
    });

    return {
      animate,
      stop,
      text,
      circle,
      show,
    };
  },
});
</script>

<style lang="postcss"></style>
