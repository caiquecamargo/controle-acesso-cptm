<template>
  <the-main class="flex flex-col gap-4 pt-14 lg:pt-20 pb-4 px-4">
    <e-card to="AddUser">
      <template #icon>
        <user-card-icon class="text-white" />
      </template>
      <template #name>
        <p
          class="flex justify-center items-center text-white text-2xl font-bold"
        >
          Adicionar usuário
        </p>
      </template>
    </e-card>
    <e-card to="AllUsers">
      <template #icon>
        <list-card-icon class="text-white" />
      </template>
      <template #name>
        <p
          class="flex justify-center items-center text-white text-2xl font-bold"
        >
          Listar usuários
        </p>
      </template>
    </e-card>
  </the-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ECard from "../components/app/ECard.vue";
import TheMain from "../components/shared/main/TheMain.vue";
import UserCardIcon from "../components/svg/UserCardIcon.vue";
import ListCardIcon from "../components/svg/ListCardIcon.vue";

export default defineComponent({
  components: { ECard, TheMain, UserCardIcon, ListCardIcon },
});
</script>

<style lang="postcss"></style>
