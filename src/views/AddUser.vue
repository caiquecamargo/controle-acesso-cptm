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
      {{ infoMessage }}
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
import { WebSocketData } from "../models/IWebSocketData";
import PageLoaderAnimation from "../components/shared/loaders/PageLoaderAnimation.vue";

export default defineComponent({
  components: { TheMain, TheTitle, FormField, PageLoaderAnimation },
  setup() {
    const WEBSOCKET_REQUEST_TIMEOUT = 35000;
    const waitingForCard = ref(false);
    const onSuccess = ref(false);
    const onError = ref(false);
    const infoMessage = ref("");
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

    const log = {
      error: (message: string) => {
        onError.value = true;
        infoMessage.value = message;
      },
      success: (message: string) => {
        onSuccess.value = true;
        infoMessage.value = message;
      },
      info: (message: string) => {
        infoMessage.value = message;
      },
    };

    const onCreate = () => {
      log.info("Estabelecendo conexão...");
      const webSocket = new WebSocket("ws://192.168.4.1/ws");

      webSocket.onopen = () => {
        startLoading();
        log.info("Aguardando leitura do cartão...");
        webSocket.send(user.name);
      };

      setTimeout(() => {
        webSocket.close();
        stopLoading();

        if (!onSuccess.value)
          log.error("Tempo de espera para leitura estourado!");
      }, WEBSOCKET_REQUEST_TIMEOUT);

      webSocket.onmessage = (event) => {
        if (event.data) {
          const message: WebSocketData = JSON.parse(event.data);

          if (message.error) {
            log.error(message.error);
          } else if (message.data) {
            Object.assign(user, message.data);

            log.success(`Usuário ${user.name} criado com sucesso!`);
          } else {
            log.error("Algo inesperado aconteceu");
          }

          stopLoading();
        }
      };

      webSocket.onerror = () => {
        log.error("Algo inesperado aconteceu");
        stopLoading();
      };

      webSocket.onclose = (event) => {
        console.log("Event closed", event);
      };
    };

    return {
      user,
      onCreate,
      onSuccess,
      onError,
      infoMessage,
      waitingForCard,
      loader,
    };
  },
});
</script>

<style lang="postcss"></style>
