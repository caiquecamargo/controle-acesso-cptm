<template>
  <div class="w-full overflow-hidden">
    <e-header />
    <router-view v-slot="{ Component }">
      <transition name="component" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <e-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EHeader from "./components/app/EHeader.vue";
import EFooter from "./components/app/EFooter.vue";

export default defineComponent({
  components: { EHeader, EFooter },
  name: "App",
});
</script>

<style>
.component-enter-from,
.component-leave-to {
  opacity: 0;
}

.component-enter-from {
  transform: translate3d(20px, 0, 0);
}

.component-leave-to {
  transform: translate3d(-30px, 0, 0);
}

.component-enter-active {
  transition: 450ms;
}

.component-leave-active {
  transition: 150ms;
}
</style>
