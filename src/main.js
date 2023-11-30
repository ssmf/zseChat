import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'

import router from './router'

const createdApp = createApp(App);

createdApp.use(router)

createdApp.mount('#app')
