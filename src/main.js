import './assets/css/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'https://malumot.store'

const app = createApp(App)

app.use(createPinia())
app.use(router, axios)

app.mount('#app')