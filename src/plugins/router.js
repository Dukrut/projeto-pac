import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import System from '../components/System.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '/',
        component: Login
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/system',
        name: 'Sistema',
        component: System
    }
]

const router = new VueRouter({
    mode: 'history',
    base: 'http://localhost:8080',
    routes
})

export default router