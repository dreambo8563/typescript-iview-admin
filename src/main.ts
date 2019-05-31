import Vue from "vue";
import i18n from "@/locale";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import config from "@/config";

import iView from "iview";
import "./registerServiceWorker";

import "./index.less";
import "@/assets/icons/iconfont.css";

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock');

Vue.use(iView, {
  i18n: (key: string, value: string) => i18n.t(key, value)
});

Vue.config.productionTip = false;
Vue.prototype.$config = config;
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');
