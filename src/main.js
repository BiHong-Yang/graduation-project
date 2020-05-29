import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Nested from "./components/Logic/nested/nested.vue";
import Content from "./components/Logic/Content";
import Expression from "./components/Logic/Expression";
import "./assets/globalStyle.css";
import "highlightjs-solidity";
import hljs from "highlight.js";
import "highlight.js/styles/atelier-dune-light.css";
// import "highlight.js/styles/monokai-sublime.css";

// var hljs = require("highlight.js");
var hljsDefineSolidity = require("highlightjs-solidity");

hljsDefineSolidity(hljs);
hljs.initHighlightingOnLoad();

Vue.directive("highlightjs", {
  deep: true,
  bind: function (el, binding) {
    // on first bind, highlight all targets
    let targets = el.querySelectorAll("code");
    targets.forEach((target) => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
    });
  },
  componentUpdated: function (el, binding) {
    // after an update, re-fill the content and then highlight
    let targets = el.querySelectorAll("code");
    targets.forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value;
        hljs.highlightBlock(target);
      }
    });
  },
});

Vue.component("nested", Nested);
Vue.component("Content", Content);
Vue.component("Expression", Expression);

Vue.use(ElementUI);
Vue.config.devtools = true;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
