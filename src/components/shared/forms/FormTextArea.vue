<template>
  <div
    class="relative w-full"
    :class="{ filled: typeof field === 'number' || field }"
  >
    <textarea
      v-if="!lazy"
      class="bg-none p-3 pb-1 w-full border-b-2 border-t-0 border-r-0 border-l-2 border- border-current text-current rounded focus:border-secondary focus:ring-0"
      :style="{ height: height }"
      :disabled="disable"
      :type="type"
      :name="idInput.toString()"
      :id="idInput.toString()"
      v-model="field"
    />
    <textarea
      v-else
      class="bg-none p-3 pb-1 w-full border-b-2 border-t-0 border-r-0 border-l-2 border- border-current text-current rounded focus:border-secondary focus:ring-0"
      :style="{ height: height }"
      :disabled="disable"
      :type="type"
      :name="idInput.toString()"
      :id="idInput.toString()"
      v-model.lazy="field"
    />
    <label
      v-if="labelName"
      class="absolute rounded top-1 on-focus left-3 text-current bg-none z-10 p-1 duration-450"
      :class="[required ? 'decorator-required' : '', filled ? '-top-4' : '']"
      :for="idInput.toString()"
      >{{ labelName }}</label
    >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref, watch } from "vue";

export default defineComponent({
  name: "FormTextArea",
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
      validator: (value: string) => {
        return ["text", "number", "date", "email"].indexOf(value) !== -1;
      },
    },
    labelName: {
      type: String,
      default: "",
    },
    dataFromParent: {
      type: [String, Number],
      required: true,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const { dataFromParent, type } = toRefs(props);
    const filled = ref(false);

    const field = computed({
      get: () => {
        if (dataFromParent.value === " ") return "";
        return dataFromParent.value || "";
      },
      set: (value) => {
        if (type.value === "number") value = Number(value);
        emit(`update:data-from-parent`, value);
      },
    });

    const idInput = computed(() => {
      if (props.labelName) return props.labelName;
      return Math.random() * (1000 - 1) + 1;
    });

    watch(
      () => dataFromParent.value,
      (value) => {
        if (type.value === "number") filled.value = true;
        else filled.value = value ? true : false;
      }
    );

    return {
      field,
      idInput,
      filled,
    };
  },
});
</script>

<style lang="postcss" scoped>
textarea:focus + label {
  @apply -top-4;
}
</style>
