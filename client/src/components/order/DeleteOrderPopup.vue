<template>
  <v-dialog v-model="showDeletePopup" persistent width="400">
    <v-card>
      <v-card-title class="text-h6">
        Are you sure want to delete order ?
      </v-card-title>
      <v-card-text>
        <h4>Order Info -</h4>
        <table width="100%">
          <tr>
            <td>Source</td>
            <td>{{ itemToDelete.origin ? itemToDelete.origin.street : "" }}</td>
          </tr>
          <tr>
            <td>Destination</td>
            <td>
              {{
                itemToDelete.destination ? itemToDelete.destination.street : ""
              }}
            </td>
          </tr>
        </table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancle"> Cancel </v-btn>
        <v-btn color="error" @click="deleteClient"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteOrderPopup",
  props: {
    itemToDelete: {
      type: Object,
      default() {
        return {
          origin: {
            street: "",
          },
          destination: {
            street: "",
          },
        };
      },
    },
  },
  data() {
    return {
      showDeletePopup: false,
    };
  },
  watch: {
    itemToDelete(newVal) {
      if (Object.keys(newVal).length > 0) {
        this.showDeletePopup = true;
      }
    },
  },
  methods: {
    async deleteClient() {
      const response = await this.$axios.delete(
        "/v1/deliveries/" + this.itemToDelete._id
      );
      if (response.data) {
        this.$emit("deleted");
      }
      this.showDeletePopup = false;
    },
    cancle() {
      this.showDeletePopup = false;
      this.$emit("cancle");
    },
  },
};
</script>
