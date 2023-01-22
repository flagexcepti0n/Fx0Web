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
            // These fields are separated because vuex is not reactive in complex objects
            ctfs: [],
            writeups: {},
            writeups_markdown: {}
        }
    },
    getters: {
        getCtfs: state => {
            return state.ctfs
        },
        getWriteups: state => ctf => {
            return state.writeups[ctf]
        },
        getMarkdown: state => (ctf, writeup) => {
            return state.writeups_markdown[ctf + '/' + writeup]
        }
    },
    mutations: {
        addCtf(state, ctf) {
            // Add a new CTF to the state
            state.ctfs.push(ctf)
        },
        addWriteup(state, {ctf, writeup}) {
            // Add a new write-up to the state
            if (state.writeups[ctf] === undefined) {
                state.writeups[ctf] = []
            }

            state.writeups[ctf].push(writeup)
        },
        addWriteupMarkdown(state, {ctf, writeup, markdown}) {
            // Add a new write-up markdown to the state
            state.writeups_markdown[ctf + '/' + writeup] = markdown
        }
    }
}))

// Use writeups plugin ./plugins/writeups.js
app.use(writeups)

app.mount('#app')
