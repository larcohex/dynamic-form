<!-- DON'T USE IT AS A STANDALONE COMPONENT -->
<template>
  <div v-if="hasId()" class="sm:col-span-6">
    <component
      :is="field.component"
      v-bind="field"
      v-model="value"
      :error="errorMessage"
      @blur="handleBlur"
    ></component>
  </div>
  <template v-else-if="isArray()">
    <h4 v-show="fields.length" class="font-medium sm:col-span-6">
      {{ field.label }}
    </h4>
    <div class="sm:col-span-6 space-y-6 divide-y">
      <div
        v-for="(childField, index) in fields"
        :key="childField.key"
        class="space-y-6"
      >
        <Field
          v-for="formField in field.fields"
          :key="formField.id"
          :field="{
            ...formField,
            name: `${field.name}[${index}].${formField.name}`,
          }"
        />
        <button
          type="button"
          class="
            inline-flex
            items-center
            px-4
            py-2
            border border-transparent
            text-sm
            font-medium
            rounded-md
            text-indigo-700
            bg-indigo-100
            hover:bg-indigo-200
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
          @click="remove(index)"
        >
          <XIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Remove
        </button>
      </div>
    </div>
    <div class="sm:col-span-6">
      <button
        type="button"
        class="
          inline-flex
          items-center
          px-4
          py-2
          border border-transparent
          shadow-sm
          text-sm
          font-medium
          rounded-md
          text-white
          bg-indigo-600
          hover:bg-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
        @click="push"
      >
        <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Add
      </button>
    </div>
  </template>
  <template
    v-for="(childField, index) in field"
    v-else
    :key="childField.id || index"
  >
    <Field :field="childField" />
  </template>
</template>

<script>
import { useField, useFieldArray } from "vee-validate";
import has from "lodash-es/has";
import fromPairs from "lodash-es/fromPairs";
import map from "lodash-es/map";
import { PlusIcon, XIcon } from "@heroicons/vue/solid";
import TextInput from "./TextInput.vue";
import Select from "./Select.vue";
import CheckboxGroup from "./CheckboxGroup.vue";
import Textarea from "./Textarea.vue";

export default {
  name: "Field",
  components: { PlusIcon, XIcon, TextInput, Select, CheckboxGroup, Textarea },
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  emits: ["change"],
  setup(props) {
    const hasId = () => has(props.field, "id");
    const isArray = () => has(props.field, "addLabel");
    const result = { hasId, isArray };
    if (hasId()) {
      const { value, handleBlur, errorMessage } = useField(
        props.field.name,
        props.field.rules
      );
      result.value = value;
      result.handleBlur = handleBlur;
      result.errorMessage = errorMessage;
    }
    if (isArray()) {
      const { remove, push, fields } = useFieldArray(props.field.name);
      const getInitialValues = () =>
        fromPairs(
          map(props.field.fields, (field) => [field.name, field.value])
        );
      result.remove = (index) => {
        remove(index);
      };
      result.push = () => {
        push(getInitialValues());
      };
      result.fields = fields;
    }
    return result;
  },
};
</script>
