<template>
  <div>
    <label :for="finalId" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :id="finalId"
        :type="type"
        :name="name"
        class="
          block
          w-full
          pr-10
          shadow-sm
          sm:text-sm
          rounded-md
          focus:outline-none
        "
        :class="{
          'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500':
            error,
          'border border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500':
            !error,
        }"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :autocomplete="$attrs.autocomplete"
        :aria-invalid="!!error"
        :aria-describedby="error ? finalId + '-error' : null"
        @change="setValue($event.target.value)"
        @blur="emitBlur"
      />
      <div
        v-show="error"
        class="
          absolute
          inset-y-0
          right-0
          pr-3
          flex
          items-center
          pointer-events-none
        "
      >
        <ExclamationCircleIcon
          class="h-5 w-5 text-red-500"
          aria-hidden="true"
        />
      </div>
    </div>
    <p v-if="error" :id="finalId + '-error'" class="mt-2 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { v4 as uuid } from "uuid";
import { ExclamationCircleIcon } from "@heroicons/vue/solid";
import includes from "lodash-es/includes";
import useInput from "./use-input";

export default {
  name: "TextInput",
  components: { ExclamationCircleIcon },
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return includes(["text", "password", "email", "number"], value);
      },
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const input = useInput(emit);
    const finalId = ref(props.id || uuid());
    return { ...input, finalId };
  },
};
</script>
