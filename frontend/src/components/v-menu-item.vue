<template>
  <MenuItem as="div" v-slot="{ active }">
    <slot :active="active">
      <v-button class="w-full" :active="active" v-bind="$attrs">
        <template #icon>
          <slot name="icon" />
        </template>
      </v-button>
    </slot>
  </MenuItem>
</template>

<style lang="postcss" scoped></style>
