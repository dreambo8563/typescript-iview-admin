import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "iview";
// import i18n from "@/locale";
import "./registerServiceWorker";

import "./index.less";
import "@/assets/icons/iconfont.css";

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
