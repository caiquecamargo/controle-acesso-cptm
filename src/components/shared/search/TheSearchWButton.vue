<template>
  <span class="flex gap-2">
    <form-field
      v-model:data-from-parent="search"
      :lazy="true"
      labelName="pesquisar"
    />
    <button
      class="btn-sm rounded bg-primary text-white font-bold my-1"
      @click.prevent="onSearch"
    >
      Pesquisar
    </button>
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

    const onSearch = async () => {
      if (search.value) {
        emit("onSearch", search.value);
        await nextTick();
        search.value = "";
      }
    };

    return {
      search,
      onSearch,
    };
  },
});
</script>

<style lang="postcss"></style>
