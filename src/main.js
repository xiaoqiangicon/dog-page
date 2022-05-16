import Vue from 'vue'
import App from './App.vue'
import './index.css'

import Velocity from 'velocity-animate'

Vue.config.productionTip = false
window.Velocity = window.velocity = Velocity

new Vue({
  render: h => h(App),
}).$mount('#app')
