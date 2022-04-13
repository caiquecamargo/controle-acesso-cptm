<template>
  <ul class="divide-y divide-primary">
    <li class="grid grid-cols-2 px-1 py-2 italic text-primary">
      <span>id do cartão</span>
      <span>nome do usuário</span>
    </li>
    <li
      class="grid grid-cols-2 px-1 py-2 divide-y divide-grey-200"
      v-for="user in users"
      :key="user.cardId"
      @click="onClick(user)"
    >
      <span>{{ user.cardId }}</span>
      <span>{{ user.name }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { User } from "@/models/IUser";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["onClick"],
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true,
    },
  },
  setup(_, { emit }) {
    const onClick = (user: User) => {
      emit("onClick", user);
    };

    return {
      onClick,
    };
  },
});
</script>

<style lang="postcss"></style>
