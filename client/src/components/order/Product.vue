<template>
  <v-col cols="12">
    <v-combobox
      v-model="select"
      :items="items"
      label="Combobox"
      multiple
      outlined
      dense
    ></v-combobox>
  </v-col>
</template>

<script>
export default {
  name: "Product",
  props: {
    value: {
      type: Array,
    },
  },
  data() {
    return {
      products: {},
    };
  },
  watch: {
    address: {
      handler(newVal) {
        this.$emit("input", newVal);
      },
      deep: true,
    },
    value: {
      handler(newVal) {
        this.address = newVal;
      },
      deep: true,
    },
  },
  created() {},
};
</script>
