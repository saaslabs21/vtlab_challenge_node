<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        :rules="[() => !!address.street || 'This field is required']"
        label="Street"
        outlined
        dense
        v-model="address.street"
        hint="Enter Street"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        :rules="[() => !!address.number || 'This field is required']"
        label="Number"
        outlined
        dense
        v-model="address.number"
        hint="Enter Number"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        :rules="[() => !!address.city || 'This field is required']"
        label="City"
        outlined
        dense
        v-model="address.city"
        hint="Enter City"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        :rules="[() => !!address.postalCode || 'This field is required']"
        label="Postal Code"
        outlined
        dense
        v-model="address.postalCode"
        hint="Enter Postal Code"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Address",
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      address: {},
    };
  },
  watch: {
    address: {
      handler(newVal) {
        console.log("_________", newVal);
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
};
</script>
