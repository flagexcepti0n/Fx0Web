import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import App from './App.vue'

import './tailwind.css'
import './plugins/writeups.js'
import writeups from "./plugins/writeups.js";

const app = createApp(App)

// Use vue-router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { name: "home", path: '/', component: () => import('./pages/Home.vue') },
        { name: "write-ups", path: '/writeups/:ctf?/:writeup?/', component: () => import('./pages/Write-ups.vue') },
        { name: "404",path: '/:pathMatch(.*)*', redirect: '/' }
    ]
})
app.use(router)

// Use vuex
app.use(createStore({
    state () {
        return {
            ctfs: {},
        }
    },
    mutations: {
        addCtf(state, {ctf, writeups = []}) {
            // Add a new CTF to the state
            state.ctfs[ctf] = writeups
        },
        addWriteup(state, {ctf, writeup}) {
            // Add a new write-up to the state
            state.ctfs[ctf].push(writeup)
        }
    }
}))

// Use writeups plugin ./plugins/writeups.js
app.use(writeups)

app.mount('#app')
