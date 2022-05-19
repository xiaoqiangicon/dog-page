import Vue from 'vue'
import App from './App.vue'
import './index.css'
import 'vant/lib/loading/style';
import 'vant/lib/progress/style';

import Velocity from 'velocity-animate'
import { Loading, Progress } from 'vant';

Vue.config.productionTip = false
window.Velocity = window.velocity = Velocity

Vue.use(Loading);
Vue.use(Progress);

new Vue({
  render: h => h(App),
}).$mount('#app')
