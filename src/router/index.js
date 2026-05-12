import { createRouter, createWebHistory } from 'vue-router'
import JejumPage from '@/pages/JejumPage.vue'
import NutricaoPage from '@/pages/NutricaoPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'

const routes = [
    { path: '/', redirect: '/jejum'},
    { path: '/jejum', component: JejumPage},
    { path: '/nutricao', component: NutricaoPage},
    { path: '/dashboard', component: DashboardPage},
]

export default createRouter({
    history: createWebHistory(),
    routes,
})