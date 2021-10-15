<template>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="finalId"
        :name="name"
        :value="value"
        :checked="checked"
        type="checkbox"
        class="
          focus:ring-indigo-500
          h-4
          w-4
          text-indigo-600
          border-gray-300
          rounded
        "
        @change="process"
      />
    </div>
    <div class="ml-3 text-sm">
      <label :for="finalId" class="font-medium text-gray-700">{{
        label
      }}</label>
      <p v-if="description" class="text-gray-500">{{ description }}</p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import some from "lodash-es/some";
import isEqual from "lodash-es/isEqual";
import concat from "lodash-es/concat";
import filter from "lodash-es/filter";
import { v4 as uuid } from "uuid";

export default {
  name: "Checkbox",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: "",
    },
    value: {
      type: [Boolean, String, Number, Object, Array],
      default: null,
    },
    label: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: null,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const finalId = ref(props.id || uuid());
    const checked = computed(() =>
      some(props.modelValue, (value) => isEqual(value, props.value))
    );
    const process = (event) => {
      let result;
      if (some(props.modelValue, (value) => isEqual(value, props.value))) {
        result = filter(
          props.modelValue,
          (value) => !isEqual(value, props.value)
        );
      } else {
        result = concat(props.modelValue, props.value);
      }
      emit("update:modelValue", result);
      emit("change", event);
    };
    return { finalId, checked, process };
  },
};
</script>
