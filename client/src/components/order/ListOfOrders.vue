<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            List of Orders ({{ total }})
            <v-spacer></v-spacer>
            <v-btn @click="$emit('newOrder')">New Order</v-btn>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="deliveries"
            :server-items-length="total"
            :options.sync="options"
            class="elevation-1"
          >
            <template v-slot:[`item.origin`]="{ item }">
              {{ item.origin.street }}
            </template>
            <template v-slot:[`item.destination`]="{ item }">
              {{ item.destination.street }}
            </template>
            <template v-slot:[`item.products`]="{ item }">
              {{ item.products.length }}
            </template>
            <template v-slot:[`item.when`]="{ item }">
              {{ $dayjs(item.when) }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn text class="btn-link" @click="triggerEdit(item)">
                Edit
              </v-btn>
              <v-btn text class="btn-link" @click="triggerDelete(item)">
                Delete
              </v-btn>
              {{ item.id }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ListOfOrders",
  data: () => ({
    deliveries: [],
    total: 0,
    page: 1,
    limit: 10,
    options: {},
    headers: [
      {
        text: "Source",
        sortable: true,
        value: "origin",
      },
      {
        text: "Destination",
        sortable: true,
        value: "destination",
      },
      {
        text: "Order At",
        sortable: true,
        value: "when",
      },
      {
        text: "Product Count",
        align: "start",
        sortable: false,
        value: "products",
      },
      {
        text: "",
        value: "action",
        sortable: false,
      },
    ],
  }),
  watch: {
    options: {
      async handler(newVal) {
        this.page = newVal.page;
        await this.getDeliveries();
      },
      deep: true,
    },
  },
  methods: {
    async getDeliveries() {
      const response = await this.$axios.get(
        `/v1/deliveries?limit=${this.limit}&page=${this.page}`
      );
      if (response.data.data) {
        this.deliveries = response.data.data.deliveries;
        this.total = response.data.data.totalResults;
      }
    },
    triggerDelete(i) {
      this.$emit("delete", i);
    },
    triggerEdit(i) {
      this.$emit("edit", i);
    },
  },
};
</script>
