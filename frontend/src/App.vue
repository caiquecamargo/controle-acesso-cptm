<template>
  <div class="w-screen overflow-hidden min-h-screen">
    <v-header />
    <c-menu-aside />

    <router-view v-slot="{ Component }">
      <transition name="component" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <v-footer />
  </div>
</template>

<script setup lang="ts"></script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

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
  transition: 150ms;
}
.component-leave-active {
  transition: 450ms;
}
</style>
