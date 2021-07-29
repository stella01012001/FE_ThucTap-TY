import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Menu from './components/Menu.vue'
import EventType from './components/ItemMenu/Event-Type/Index.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        {
            path: '/menu', component: Menu, children: [
                { path: '/menu/event-type', component: EventType },
            ]
        }
    ]
})