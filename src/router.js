import Vue from 'vue'
import  Router  from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Menu from './components/Menu.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login},
        {path: '/menu', component: Menu}
    ]
})