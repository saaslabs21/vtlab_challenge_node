<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://landing.vtlab.net/wp-content/uploads/2019/05/logo.png"
        transition="scale-transition"
        width="150"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn
      v-if="!isLoggedIn"
      href="https://landing.vtlab.net/"
      target="_blank"
      text
    >
      <span class="mr-2">Visit Website</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
    <v-btn v-else @click="loggedOut" text>
      <span class="mr-2">Logout</span>
      <v-icon>mdi-arrow-right-bottom</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
/* eslint-disable */
export default {
  name: "AppHeader",
  components: {},
  data: () => ({
    isLoggedIn: false,
  }),
  created() {
    this.isLoggedIn = localStorage.LoggedIn
      ? localStorage.LoggedIn == "Y"
      : false;
  },
  methods: {
    loggedOut() {
      localStorage.clear();
      location.reload();
    },
  },
};
</script>
