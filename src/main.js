import Vue from 'vue'
import App from './App.vue'
import './index.css'
import 'vant/lib/loading/style';

import Velocity from 'velocity-animate'
import { Loading } from 'vant';

Vue.config.productionTip = false
window.Velocity = window.velocity = Velocity

Vue.use(Loading)

new Vue({
  render: h => h(App),
}).$mount('#app')
