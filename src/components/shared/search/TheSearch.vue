<template>
  <span>
    <form-field
      v-model:data-from-parent="search"
      :lazy="true"
      labelName="pesquisar"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watchEffect } from "vue";
import FormField from "../forms/FormField.vue";

export default defineComponent({
  components: { FormField },
  emits: ["onSearch"],
  setup(_, { emit }) {
    const search = ref("");

    watchEffect(async () => {
      if (search.value) {
        emit("onSearch", search.value);
        await nextTick();
        search.value = "";
      }
    });

    return {
      search,
    };
  },
});
</script>

<style lang="postcss"></style>
