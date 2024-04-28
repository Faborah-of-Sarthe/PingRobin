import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')

watch(
    pinia.state,
    (state) => {
        localStorage.setItem('pinia-state', JSON.stringify(state));
    },
    { deep: true }
);