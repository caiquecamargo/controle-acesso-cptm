<template>
  <TransitionRoot appear :show="asideMenu.isOpen" as="aside">
    <Dialog as="div" @close="asideMenu.close">
      <div class="fixed inset-0 z-40 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-neutral-800 bg-opacity-10" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="transform -translate-x-full"
            enter-to="transform translate-x-0"
            leave="duration-300 ease-in"
            leave-from="transform translate-x-0"
            leave-to="transform -translate-x-full"
          >
            <div
              class="fixed top-0 bottom-0 left-0 z-40 overflow-hidden will-change-auto"
            >
              <slot :isOpen="asideMenu.isOpen" />
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { useAsideMenu } from "@/composables/use-aside-menu";
const asideMenu = useAsideMenu();
</script>

<style lang="postcss" scoped></style>
