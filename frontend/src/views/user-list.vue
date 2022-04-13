<template>
  <v-page>
    <template #title>
      <h1 class="text-2xl">Usuários cadastrados</h1>
    </template>

    <v-input v-model.lazy="search" label="Procurar usuário" />

    <div v-if="loading" class="flex justify-center mt-12">
      <v-loader-circle color="black" class="h-10 w-10" />
    </div>
    <v-list-users
      v-else-if="users.length && users[0].cardId"
      class="mt-4"
      :users="users"
      @on-click="onClick"
    />
    <div v-else class="flex justify-center mt-12">
      <p class="italic">Nenhum usuário cadastrado</p>
    </div>
  </v-page>
</template>

<script setup lang="ts">
import { User } from "@/models/IUser";
import { UserService } from "@/services/UserService";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const users = ref<User[]>([]);
const loading = ref(false);
const router = useRouter();

const onClick = (user: User) => {
  router.push({ name: "user", params: { id: user.cardId } });
};

const getUsers = async () => {
  users.value = [];
  loading.value = true;
  if (search.value) users.value = await UserService.findByName(search.value);
  else users.value = await UserService.findAll();

  loading.value = false;
};

watch(search, getUsers, { immediate: true });
</script>

<style lang="postcss" scoped></style>
