<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="emitSubmit">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ title }}
        </h3>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <Field :field="schema" />
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="submit"
          class="
            inline-flex
            items-center
            px-4
            py-2
            border border-transparent
            text-sm
            font-medium
            rounded-md
            shadow-sm
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { watch } from "vue";
import { useForm } from "vee-validate";
import has from "lodash-es/has";
import set from "lodash-es/set";
import forEach from "lodash-es/forEach";
import keys from "lodash-es/keys";
import Field from "./Field.vue";

export default {
  name: "Form",
  components: { Field },
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    schema: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    submitLabel: {
      type: String,
      default: "Submit",
    },
    skip: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["change", "skip", "submit"],
  setup(props, { emit }) {
    const getInitialValuesFromSchemaHelper = (result, path, node) => {
      if (has(node, "id")) {
        set(result, path, node.value);
      } else if (!has(node, "addLabel")) {
        forEach(keys(node), (key) =>
          getInitialValuesFromSchemaHelper(
            result,
            `${path}${path ? "." : ""}${key}`,
            node[key]
          )
        );
      }
    };
    const getInitialValuesFromSchema = () => {
      const result = {};
      getInitialValuesFromSchemaHelper(result, "", props.schema);
      return result;
    };
    let { values, handleSubmit, meta } = useForm({
      initialValues: getInitialValuesFromSchema(),
    });
    watch(values, (newValues) => {
      emit("change", newValues);
    });
    const emitSubmit = handleSubmit((vals) => {
      emit("submit", vals);
    });
    return { meta, emitSubmit };
  },
};
</script>
