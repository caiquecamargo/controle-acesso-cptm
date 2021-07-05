<template>
  <the-button-link-internal
    class="grid grid-cols-link gap-2 btn-lg text-white font-bold"
    :to="{ name: 'Home' }"
  >
    <home-icon class="text-white" />
    <p>Home</p>
  </the-button-link-internal>
  <the-button-link-internal
    class="grid grid-cols-link gap-2 btn-lg text-white font-bold"
    :to="{ name: 'AddUser' }"
  >
    <user-icon class="text-white" />
    <p>Adicionar usuário</p>
  </the-button-link-internal>
  <the-button-link-internal
    class="grid grid-cols-link gap-2 btn-lg text-white font-bold"
    :to="{ name: 'AllUsers' }"
  >
    <list-icon class="text-white" />
    <p>Ver usuários cadastrados</p>
  </the-button-link-internal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheButtonLinkInternal from "../shared/button/TheButtonLinkInternal.vue";
import HomeIcon from "../svg/HomeIcon.vue";
import UserIcon from "../svg/UserIcon.vue";
import ListIcon from "../svg/ListIcon.vue";

export default defineComponent({
  components: { TheButtonLinkInternal, HomeIcon, UserIcon, ListIcon },
});
</script>

<style lang="postcss"></style>
