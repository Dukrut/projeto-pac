import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/views/Login.vue'
import System from '../components/base/System.vue'
import UsersList from '../components/views/configuration/UsersList.vue'
import GroupList from '../components/views/configuration/GroupList.vue'
import Challenges from '../components/views/Challenges.vue'

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
        component: System,
        props: true
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
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
