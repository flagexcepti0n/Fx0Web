import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './tailwind.css'


const app = createApp(App)

// Use vue-router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { name: "home", path: '/', component: () => import('./pages/Home.vue') },
        { name: "writeup", path: '/writeup/:ctf?/:challenge?/', component: () => import('./pages/Writeup.vue') },
        { name: "404",path: '/:pathMatch(.*)*', redirect: '/' }
    ]
})
app.use(router)


app.mount('#app')
