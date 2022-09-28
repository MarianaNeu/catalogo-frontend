import Vue from 'vue'
import App from './App.vue'
import router from "@/router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faCreditCard, faHeart, faSearchPlus, faSearch, faEye, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleDown, faCreditCard, faHeart, faSearchPlus, faSearch, faEye, faTrash, faPencil)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

require("./assets/main.scss")

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
