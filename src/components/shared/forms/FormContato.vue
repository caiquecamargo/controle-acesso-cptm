<template>
  <form ref="form">
    <form-field
      labelName="Nome"
      :required="true"
      v-model:data-from-parent="name"
      :lazy="true"
    />
    <form-field labelName="Email" v-model:data-from-parent="email" />
    <form-field labelName="Telefone" v-model:data-from-parent="telephone" />
    <form-text-area
      labelName="Descrição"
      v-model:data-from-parent="description"
      height="150px"
    />
    <the-button
      class="
        btn-xl-border-md
        font-opensans font-bold
        clamptext-1-14
        py-1
        justify-self-center
        hover:text-white
        hover:bg-primary
      "
      @click.prevent="sendMessage"
    >
      <p>ENVIAR</p>
    </the-button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormField from "./FormField.vue";
import FormTextArea from "./FormTextArea.vue";
import FormDefault from "./FormDefault.vue";
import TheButton from "../button/TheButton.vue";

export default defineComponent({
  components: { FormField, FormTextArea, FormDefault, TheButton },
  setup() {
    const name = ref("");
    const email = ref("");
    const telephone = ref("");
    const description = ref("");
    const form = ref(null as unknown);

    const sendMessage = async () => {
      const formData = new FormData(
        form.value as HTMLFormElement
      ) as URLSearchParams;

      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });

        window.alert("Formulário enviado com sucesso!");
      } catch (error) {
        window.alert("Erro ao enviar formulário!");
      }
    };

    return {
      name,
      email,
      telephone,
      description,
      sendMessage,
      form,
    };
  },
});
</script>
