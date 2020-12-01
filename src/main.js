import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

Vue.config.productionTip = false
/*采用原型给$bus赋值一个实例*/
Vue.prototype.$bus=new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
