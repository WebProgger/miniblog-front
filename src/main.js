import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import TheLayout from "@/components/layout/TheLayout";
import TheLoader from "@/components/loader/TheLoader";
import TheModal from "@/components/modal/TheModal";

Vue.component(TheLayout.name, TheLayout);
Vue.component(TheLoader.name, TheLoader);
Vue.component(TheModal.name, TheModal);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
