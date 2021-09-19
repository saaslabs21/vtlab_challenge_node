const axios = require('axios');
import Vue from "vue";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:5555/api",
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});

Vue.prototype.$axios = instance;