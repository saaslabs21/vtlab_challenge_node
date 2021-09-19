<template>
  <v-app>
    <app-header />
    <v-main>
      <OrderManagement v-if="isLoggedIn" />
      <Login v-else />
    </v-main>
  </v-app>
</template>

<script>
import OrderManagement from "./components/OrderManagement";
import AppHeader from "./components/AppHeader";
import Login from "./components/Login.vue";
export default {
  name: "App",

  components: {
    AppHeader,
    OrderManagement,
    Login,
  },

  data: () => ({
    isLoggedIn: false,
  }),
  created() {
    this.isLoggedIn = localStorage.LoggedIn
      ? localStorage.LoggedIn == "Y"
      : false;
  },
};
</script>
