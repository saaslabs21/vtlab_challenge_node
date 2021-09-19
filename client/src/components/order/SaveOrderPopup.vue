<template>
  <v-dialog v-model="showPopup" persistent width="650">
    <v-card>
      <v-card-title class="text-h6">
        {{ isEdit ? "Edit" : "New" }} Order
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" :lazy-validation="false">
          <v-row>
            <v-col cols="6">
              <h3>Origin</h3>
              <Address v-model="delivery.origin" />
            </v-col>
            <v-col cols="6">
              <h3>Desitnation</h3>
              <Address v-model="delivery.destination" />
            </v-col>
            <v-col cols="12"> </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close"> Cancel </v-btn>
        <v-btn color="primary" @click="saveOrder">
          {{ isEdit ? "Save" : "Add" }} Order</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Address from "./Address.vue";

export default {
  name: "SaveClient",
  components: {
    Address,
  },
  props: {
    itemToEdit: {
      type: Object,
      default() {
        return {};
      },
    },
    showPopup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      delivery: {
        origin: {},
        destination: {},
      },
      isEdit: false,
      valid: true,
      showProviderPopup: false,
    };
  },
  watch: {
    itemToEdit: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.delivery = newVal;
          this.isEdit = true;
        } else {
          this.isEdit = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    async saveOrder() {
      const isValid = await this.$refs.form.validate();
      if (isValid) {
        if (this.isEdit) {
          await this.addOrder();
        } else {
          await this.updateOrder();
        }
        this.close();
      }
    },
    async addOrder() {
      const response = await this.$axios.post("/v1/deliveries", this.delivery);
      if (response.data) {
        this.$emit("added");
      }
    },
    async updateOrder() {
      const response = await this.$axios.put("/v1/deliveries", this.delivery);
      if (response.data) {
        this.$emit("updated");
      }
    },
    close() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.delivery = {
        origin: {},
        destination: {},
      };
      this.$emit("close");
    },
  },
};
</script>
