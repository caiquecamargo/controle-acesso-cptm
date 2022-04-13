<template>
  <div>
    <slot :toggle="asideMenu.toggle">
      <v-button @click.prevent="asideMenu.toggle">
        <template #icon>
          <div class="relative w-5 h-5">
            <transition
              enter-active-class="transition duration-100 ease-out delay-200"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-200 ease-out"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <icon-heros-menu
                class="absolute w-5 h-5"
                v-if="!asideMenu.isOpen"
              />
              <icon-heros-x-circle class="absolute w-5 h-5" v-else />
            </transition>
          </div>
        </template>
      </v-button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useAsideMenu } from "@/composables/use-aside-menu";
const asideMenu = useAsideMenu();
</script>
