<template>
  <label>
    <p v-if="label" v-text="label" />
    <input
      class="border border-black p-2 w-full rounded"
      :class="[
        loading ? 'animate-pulse bg-neutral-200 border-neutral-200' : '',
        disabled ? 'bg-neutral-200 border-neutral-200' : '',
      ]"
      :disabled="disabled"
      v-model="value"
      @focusin="onFocusin"
      @focusout="onFocusout"
    />
  </label>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { PropType, ref, toRefs } from "vue";

type Modifiers = {
  lazy?: boolean;
};

const props = defineProps({
  modelModifiers: {
    type: Object as PropType<Modifiers>,
    default: () => ({} as Modifiers),
  },
  modelValue: String,
  label: String,
  loading: Boolean,
  disabled: Boolean,
});

const emit = defineEmits<{
  (emit: "update:modelValue", value: string | undefined): void;
}>();

const { modelValue, modelModifiers } = toRefs(props);

let localState: string | undefined = "";
const hasFocus = ref(false);
const onFocusin = () => (hasFocus.value = true);
const onFocusout = () => {
  const { lazy } = modelModifiers.value;
  hasFocus.value = false;
  if (lazy) {
    emit("update:modelValue", localState);
  }
};

const value = computed({
  get: () => modelValue?.value,
  set: (value) => {
    const { lazy } = modelModifiers.value;
    !lazy ? emit("update:modelValue", value) : (localState = value);
  },
});
</script>

<style lang="postcss" scoped></style>
