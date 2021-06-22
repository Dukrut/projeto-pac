import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/views/Login.vue'
import System from '../components/base/System.vue'
import UsersList from '../components/views/configuration/UsersList.vue'
import GroupList from '../components/views/configuration/GroupList.vue'
import Challenges from '../components/views/Challenges.vue'
import Ranking from '../components/views/Ranking.vue'

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
    },
    {
        path: '/users',
        name: 'Usuários',
        component: UsersList
    },
    {
        path: '/groups',
        name: 'Grupos',
        component: GroupList
    },
    {
        path: '/dashboard',
        name: 'Desafios',
        component: Challenges
    },
    {
        path: '/ranking',
        name: 'Ranking',
        component: Ranking
    }

]

const router = new VueRouter({
    mode: 'history',
    base: 'http://localhost:8080',
    routes
})

export default router
