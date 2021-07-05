<template>
  <the-main
    class="flex flex-col gap-4 pt-14 lg:pt-20 pb-4 px-4"
    v-if="user.cardId"
  >
    <the-title title="Usuário" />
    <form-field
      label-name="id do cartão"
      v-model:data-from-parent="user.cardId"
      :disable="true"
    />
    <form-field
      label-name="nome do usuário"
      v-model:data-from-parent="user.name"
      :lazy="true"
    />
    <div class="flex justify-around gap-2 mt-6">
      <button
        @click.prevent="onUpdate"
        class="btn-xl w-full py-2 rounded bg-secondary text-white"
      >
        Editar
      </button>
      <button
        @click.prevent="onDelete"
        class="btn-xl w-full py-2 rounded bg-red-800 text-white"
      >
        Deletar
      </button>
    </div>
  </the-main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import TheMain from "../components/shared/main/TheMain.vue";
import { User } from "../models/IUser";
import { UserService } from "../services/UserService";
import FormField from "../components/shared/forms/FormField.vue";
import TheTitle from "../components/shared/paragraph/TheTitle.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { TheMain, FormField, TheTitle },
  setup(props) {
    const user = reactive<User>({} as User);
    const router = useRouter();

    const getUser = async () => {
      const response = await UserService.findById(props.id);
      Object.assign(user, response);
    };
    getUser();

    const onUpdate = async () => {
      try {
        const response = await UserService.update(user);
        Object.assign(user, response);

        window.alert("Usuário atualizado com sucesso!");
      } catch (error) {
        window.alert("Error ao atualizar usuário! erro: " + error);
      }
    };

    const onDelete = async () => {
      try {
        await UserService.delete(user.cardId);

        window.alert(`Usuário ${user.name} deletado com sucesso!`);
        router.back();
      } catch (error) {
        window.alert(
          `Usuário ${user.name} deletado com sucesso! erro: ${error}`
        );
      }
    };

    return {
      user,
      onUpdate,
      onDelete,
    };
  },
});
</script>

<style lang="postcss"></style>
