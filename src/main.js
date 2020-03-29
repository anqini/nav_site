import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import Routes from './routes'
import VueResource from 'vue-resource'


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.http.options.root = "https://152.136.150.88:5000/api/" ;

const router = new VueRouter({
  routes: Routes
});

Vue.filter('snippet', value => {
    if (typeof value == "number") {
      value = value.toString();
    } else if (typeof value == "undefined") {
      value = ""
    }
    if (value.length > 13) {
      return value.slice(0, 12) + '...';
    } else {
      return value
    }
});
Vue.filter('snippet-title', value => {
  if (typeof value == "number") {
    value = value.toString();
  } else if (typeof value == "undefined") {
    value = ""
  }
  if (value.length > 11) {
    return value.slice(0, 11) + '...';
  } else {
    return value;
  }
});
new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
