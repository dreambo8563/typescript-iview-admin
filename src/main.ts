import Vue from "vue";
import i18n from "@/locale";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import config from "@/config";
import installPlugin from "@/plugin";
import iView from "iview";
import { directive as clickOutside } from "v-click-outside-x";
import "./registerServiceWorker";

import "./index.less";
import "@/assets/icons/iconfont.css";

import VOrgTree from "v-org-tree";
import "v-org-tree/dist/v-org-tree.css";

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock');

Vue.use(iView, {
  i18n: (key: string, value: string) => i18n.t(key, value)
});

Vue.use(VOrgTree);
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue);
Vue.directive('clickOutside', clickOutside);

Vue.config.productionTip = false;
Vue.prototype.$config = config;
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');
