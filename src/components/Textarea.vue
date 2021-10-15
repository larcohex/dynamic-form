<template>
  <div>
    <label :for="finalId" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="mt-1 relative">
      <textarea
        :id="finalId"
        :name="name"
        rows="3"
        class="
          shadow-sm
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          sm:text-sm
          border border-gray-300
          rounded-md
        "
        :value="modelValue"
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
import useInput from "./use-input";

export default {
  name: "Textarea",
  components: { ExclamationCircleIcon },
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
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
  },
  setup(props, { emit }) {
    const input = useInput(emit);
    const finalId = ref(props.id || uuid());
    return { ...input, finalId };
  },
};
</script>
