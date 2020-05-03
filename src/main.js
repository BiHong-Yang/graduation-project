import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Nested from "./components/Logic/nested/nested.vue";
import Content from "./components/Logic/Content";
import "./assets/globalStyle.css";

Vue.component("nested", Nested);
Vue.component("Content", Content);

Vue.use(ElementUI);
Vue.config.devtools = true;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
