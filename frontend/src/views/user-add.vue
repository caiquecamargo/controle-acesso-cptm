<template>
  <v-page>
    <template #title>
      <h1 class="text-2xl">Adicionar usuário</h1>
    </template>
    <v-input v-model="user.name" label="Nome do usuário" />

    <div class="flex justify-around gap-2 mt-6">
      <v-button @click.prevent="onCreate" class="bg-primary text-white" medium>
        Criar usuário
      </v-button>
    </div>
    <div
      class="text-lg text-center italic my-10"
      :class="{ 'text-whatsapp': log.onSuccess, 'text-red-800': log.onError }"
    >
      {{ log.message }}
    </div>
    <div class="relative">
      <v-loader-circle class="h-4" v-show="waitingForCard" />
    </div>
  </v-page>
</template>

<script setup lang="ts">
import Log from "@/controllers/Log";
import WebSocketController from "@/controllers/WebSocketCotroller";
import { User } from "@/models/IUser";
import { reactive, ref } from "vue";

const BASE_URL = import.meta.env.VITE_BASE_WS as string;

const waitingForCard = ref(false);
const user = reactive<User>({
  cardId: "",
  name: "",
});

const startLoading = () => {
  waitingForCard.value = true;
};

const stopLoading = () => {
  waitingForCard.value = false;
};

const log = new Log();

const websocket = new WebSocketController(BASE_URL, log);
websocket.beforeEach(() => {
  startLoading();
});

websocket.afterEach(() => {
  stopLoading();
});

const onCreate = () => {
  if (user.name) {
    websocket.sendOnCreate(user.name);
    websocket.createConnection();
  } else log.info("Digite um nome para o usuário!");
};
</script>

<style lang="postcss" scoped></style>
