import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import apiService from './config/service';
import datefilter from './config/datefilter';
import errorfilter from './config/errorfilter';
import { CHECK_AUTH } from './store/actionType';

Vue.config.productionTip = false

Vue.filter("date",datefilter);
Vue.filter("error",errorfilter);
apiService.init();

router.beforeEach((to, from, next) => {
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
