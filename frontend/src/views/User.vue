<template>
  <v-page>
    <template #title>
      <h1 class="text-2xl">Usuário</h1>
    </template>

    <div class="flex flex-col gap-2 mt-2">
      <v-input
        label="id do cartão"
        disabled
        :loading="getLoading"
        v-model="user.cardId"
      />
      <v-input
        label="nome do usuário"
        :loading="getLoading"
        v-model.lazy="user.name"
      />
      <div class="flex justify-around gap-2 mt-6">
        <v-button
          class="bg-secondary text-white w-full"
          large
          centered
          :loading="updateLoading"
          @click.prevent="onUpdate"
        >
          Atualizar
        </v-button>
        <v-button
          class="bg-primary text-white w-full"
          large
          centered
          :loading="deleteLoading"
          @click.prevent="onDelete"
        >
          Deletar
        </v-button>
      </div>
    </div>
  </v-page>
</template>

<script setup lang="ts">
import { User } from "@/models/IUser";
import { UserService } from "@/services/UserService";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const user = reactive<User>({} as User);
const router = useRouter();
const getLoading = ref(false);
const updateLoading = ref(false);
const deleteLoading = ref(false);

const getUser = async () => {
  getLoading.value = true;
  const response = await UserService.findById(props.id);
  Object.assign(user, response);
  getLoading.value = false;
};
getUser();

const onUpdate = async () => {
  updateLoading.value = true;

  try {
    const response = await UserService.update(user);
    Object.assign(user, response);

    window.alert("Usuário atualizado com sucesso!");
  } catch (error) {
    window.alert("Error ao atualizar usuário! erro: " + error);
  } finally {
    updateLoading.value = false;
  }
};

const onDelete = async () => {
  deleteLoading.value = true;

  try {
    await UserService.delete(user.cardId);

    window.alert(`Usuário ${user.name} deletado com sucesso!`);
    router.back();
  } catch (error) {
    window.alert(`Usuário ${user.name} deletado com sucesso! erro: ${error}`);
  } finally {
    deleteLoading.value = false;
  }
};
</script>

<style lang="postcss" scoped></style>
