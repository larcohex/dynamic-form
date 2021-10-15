<template>
  <fieldset>
    <legend class="text-base font-medium text-gray-900">{{ label }}</legend>
    <div class="mt-4 space-y-4">
      <Checkbox
        v-for="(option, value) in options"
        :id="value"
        :key="value"
        :name="name"
        :value="value"
        :label="option.label"
        :description="option.description"
        :model-value="modelValue"
        @update:modelValue="emitValue"
        @change="emitChange"
      />
    </div>
  </fieldset>
</template>

<script>
import Checkbox from "./Checkbox.vue";

export default {
  name: "CheckboxGroup",
  components: { Checkbox },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    name: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "change"],
  setup(_, { emit }) {
    const emitValue = (value) => {
      emit("update:modelValue", value);
    };
    const emitChange = (event) => {
      emit("change", event);
    };
    return { emitValue, emitChange };
  },
};
</script>
