import Vue from 'vue'
import App from './App.vue'
import router from './router';
import './axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSweetalert2 from 'vue-sweetalert2';
import { store } from './store'
import locale from 'element-ui/lib/locale/lang/en.js'// sửa lang lại

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
