import Vue from 'vue'
import App from './App'
import ElementUI from '../node_modules/element-ui/lib/index.js'
Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

