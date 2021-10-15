<template>
  <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-244">
    <Form
      title="Survey"
      :schema="schema"
      @change="updateSchema"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { array, string } from "yup";
import isEqual from "lodash-es/isEqual";
import cloneDeep from "lodash-es/cloneDeep";
import forEach from "lodash-es/forEach";
import has from "lodash-es/has";
import pick from "lodash-es/pick";
import { v4 as uuid } from "uuid";
import Form from "./components/Form.vue";

export default {
  components: { Form },
  setup() {
    const frameworks = {
      vue: {
        label: "Vue",
      },
      react: {
        label: "React",
      },
      angular: {
        label: "Angular",
      },
    };
    const schema = {
      frameworks: {
        id: 1,
        label: "Which frameworks do you have experience with?",
        component: "CheckboxGroup",
        name: "frameworks",
        value: [],
        rules: array().of(string()).min(1, "Please, select one of frameworks"),
        options: frameworks,
      },
      data: {},
    };
    let selectedFrameworks = [];
    const reactiveSchema = ref(schema);
    const updateSchema = (values) => {
      if (!isEqual(values.frameworks, selectedFrameworks)) {
        selectedFrameworks = values.frameworks;
        const newSchema = cloneDeep(schema);
        forEach(values.frameworks, (framework) => {
          newSchema.data[framework] = {
            opinion: {
              id: has(schema.data, framework)
                ? schema.data[framework].opinion.id
                : uuid(),
              label: `What is your opinion on ${frameworks[framework].label}?`,
              component: "Textarea",
              name: `data.${framework}.opinion`,
              value: "",
              rules: string().required("Field is required"),
            },
          };
        });
        if (values.frameworks.length) {
          newSchema.data.experience = {
            name: "data.experience",
            label: "Past experience",
            addLabel: "Add past experience",
            fields: [
              {
                id: 2,
                label: "Framework",
                component: "Select",
                name: "framework",
                value: values.frameworks[0],
                options: pick(frameworks, values.frameworks),
              },
              {
                id: 3,
                label: "Title",
                component: "TextInput",
                name: "title",
                value: "",
                rules: string().required("Field is required"),
              },
              {
                id: 4,
                label: "Company",
                component: "TextInput",
                name: "company",
                value: "",
                rules: string().required("Field is required"),
              },
              {
                id: 5,
                label: "Start date (year)",
                component: "TextInput",
                name: "start",
                value: "",
                rules: string().required("Field is required"),
              },
              {
                id: 6,
                label: "End date (year)",
                component: "TextInput",
                name: "end",
                value: "",
                rules: string().required("Field is required"),
              },
            ],
          };
        }
        reactiveSchema.value = newSchema;
      }
    };
    const handleSubmit = (values) => {
      console.log(values);
    };
    return {
      schema: reactiveSchema,
      updateSchema,
      handleSubmit,
    };
  },
};
</script>
