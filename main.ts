import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.vue'
import './assets/scss/main.scss'

gsap.registerPlugin(ScrollTrigger)

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: () => import('./pages/index.vue') }],
})

createApp(App).use(router).mount('#app')
