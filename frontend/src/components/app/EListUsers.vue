<template>
  <ul>
    <li class="grid grid-cols-list px-1 py-2 italic text-primary">
      <span>id do cartão</span>
      <span>nome do usuário</span>
    </li>
    <li
      class="grid grid-cols-list px-1 py-2 border-secondary border-b"
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
import { defineComponent, PropType } from "vue";
import { User } from "../../models/IUser";

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
