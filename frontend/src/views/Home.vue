<template>
  <v-page>
    <div
      class="grid grid-cols-2 gap-4 p-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <v-card-home :to="{ name: 'user-add' }">
        <template #image>
          <icon-local-add class="w-full h-auto" />
        </template>

        <template #content> Adicionar usuário </template>
      </v-card-home>
      <v-card-home :to="{ name: 'user-list' }">
        <template #image>
          <icon-local-list class="w-full h-auto" />
        </template>

        <template #content> Ver usuários cadastrados </template>
      </v-card-home>
    </div>
  </v-page>
</template>

<script setup lang="ts"></script>

<style lang="postcss" scoped></style>
