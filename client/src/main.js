import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import dayjs from "dayjs";
import "./plugins/axios";
import "./assets/style.css";

Vue.config.productionTip = false;
Vue.prototype.$dayjs = dayjs;
new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
