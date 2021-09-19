<template>
  <v-container>
    <ListOfOrders
      ref="listOrderRef"
      @newOrder="showSavePopup = true"
      @delete="triggerDelete"
      @edit="triggerEdit"
    />
    <DeleteOrderPopup
      :itemToDelete="itemToDelete"
      @cancle="itemToDelete = {}"
      @deleted="getDeliveries"
    />
    <SaveOrderPopup
      :showPopup="showSavePopup"
      :itemToEdit="itemToEdit"
      @close="
        itemToEdit = {};
        showSavePopup = false;
      "
      @added="showSavePopup = false"
      @updated="showSavePopup = false"
      @refreshProvider="getDeliveries()"
    />
  </v-container>
</template>

<script>
import DeleteOrderPopup from "./order/DeleteOrderPopup";
import ListOfOrders from "./order/ListOfOrders.vue";
import SaveOrderPopup from "./order/SaveOrderPopup";
export default {
  name: "OrderManagement",
  components: {
    ListOfOrders,
    DeleteOrderPopup,
    SaveOrderPopup,
  },
  data: () => ({
    itemToDelete: {},
    itemToEdit: {},
    showDeletePopup: false,
    showSavePopup: false,
  }),
  methods: {
    triggerDelete(i) {
      this.itemToDelete = i;
      this.showDeletePopup = true;
    },
    triggerEdit(i) {
      console.log(i);
      this.itemToEdit = i;
      this.showSavePopup = true;
    },
    async getDeliveries() {
      await this.$refs.listOrderRef.getDeliveries();
    },
  },
};
</script>
