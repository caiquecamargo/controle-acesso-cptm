<template>
  <v-menu-aside>
    <div
      class="max-w-[70vw] w-screen h-screen bg-gradient-to-r from-primary to-primary-dark text-white p-2"
    >
      <v-menu>
        <v-menu-item label="Home" @click="to('home')">
          <template #icon>
            <icon-heros-home class="w-4 h-4" />
          </template>
        </v-menu-item>
        <v-menu-item label="Adicionar usuário" @click="to('user-add')">
          <template #icon>
            <icon-heros-user class="w-4 h-4" />
          </template>
        </v-menu-item>
        <v-menu-item label="Ver usuários cadastrados" @click="to('user-list')">
          <template #icon>
            <icon-heros-users class="w-4 h-4" />
          </template>
        </v-menu-item>
      </v-menu>
    </div>
  </v-menu-aside>
</template>

<script setup lang="ts">
import { useAsideMenu } from "@/composables/use-aside-menu";
import { useRouter } from "vue-router";

const router = useRouter();
const asideMenu = useAsideMenu();

const to = (name: string) => {
  router.push({ name });
  asideMenu.close();
};
</script>

<style lang="postcss" scoped></style>
