<template>
  <v-container fluid fill-height>
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-toolbar class="primary">
          <v-toolbar-title class="white--text">
            <h4>Login !</h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="Enter your e-mail address"
                  v-model="auth.username"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Enter your password"
                  v-model="auth.password"
                  min="8"
                  type="password"
                  :rules="passwordRules"
                  counter
                  required
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn
                    @click="submit"
                    :class="{
                      'blue darken-4 white--text': valid,
                      disabled: !valid,
                    }"
                    >Login</v-btn
                  >
                </v-layout>
              </v-form>
              <br />
              <h4>Demo Account details</h4>
              <p>Email: {{ demo.username }}</p>
              <p>Password: {{ demo.password }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  name: "Login",
  components: {},
  data: () => ({
    auth: {
      username: "",
      password: "",
    },
    demo: {
      username: "admin@admin.com",
      password: "demo@123",
    },
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    passwordRules: [(v) => !!v || "Password is required"],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (
          this.demo.username === this.auth.username &&
          this.demo.password === this.auth.password
        ) {
          localStorage.setItem("LoggedIn", "Y");
          this.$refs.form.$el.submit();
        }
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
