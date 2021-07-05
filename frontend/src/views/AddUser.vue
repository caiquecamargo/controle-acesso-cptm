<template>
  <the-main class="flex flex-col pt-14 lg:pt-20 pb-4 px-4">
    <the-title title="Adicionar usuário" />
    <form-field
      label-name="nome do usuário"
      v-model:data-from-parent="user.name"
      :lazy="true"
    />
    <div class="flex justify-around gap-2 mt-6">
      <button
        @click.prevent="onCreate"
        class="btn-xl w-full py-2 rounded bg-secondary text-white"
      >
        Criar usuário
      </button>
    </div>
    <div
      class="text-lg text-center italic my-10"
      :class="{ 'text-whatsapp': onSuccess, 'text-red-800': onError }"
    >
      {{ message }}
    </div>
    <div class="relative">
      <page-loader-animation class="h-4" ref="loader" v-show="waitingForCard" />
    </div>
  </the-main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import TheMain from "../components/shared/main/TheMain.vue";
import TheTitle from "../components/shared/paragraph/TheTitle.vue";
import FormField from "../components/shared/forms/FormField.vue";
import { User } from "../models/IUser";
import WebSocketController from "../controllers/WebSocketCotroller";
import Log from "../controllers/Log";
import PageLoaderAnimation from "../components/shared/loaders/PageLoaderAnimation.vue";

export default defineComponent({
  components: { TheMain, TheTitle, FormField, PageLoaderAnimation },
  setup() {
    const waitingForCard = ref(false);
    const loader = ref<InstanceType<typeof PageLoaderAnimation>>();
    const user = reactive<User>({
      cardId: "",
      name: "",
    });

    const startLoading = () => {
      waitingForCard.value = true;
      loader.value?.animate();
    };

    const stopLoading = () => {
      waitingForCard.value = false;
      loader.value?.stop();
    };

    const log = new Log();

    const websocket = new WebSocketController("ws://192.168.4.1/ws", log);
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

    return {
      user,
      onCreate,
      ...log.exposeToTemplate(),
      waitingForCard,
      loader,
    };
  },
});
</script>

<style lang="postcss"></style>
