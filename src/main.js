import Vue from "vue";
import App from "./App.vue";
// OverlayScrollbars.css
import 'overlayscrollbars/css/OverlayScrollbars.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
