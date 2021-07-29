import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Menu from './components/Menu.vue'
import EventType from './components/ItemMenu/Event-Type/Index.vue'
import Block from './components/ItemMenu/Block/Index.vue'
import Customer from './components/ItemMenu/Customer/Index.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        {
            path: '/menu', component: Menu, children: [
                { path: '/menu/event-type', component: EventType },
                { path: '/menu/block', component: Block },
                { path: '/menu/customer', component: Customer },
            ]
        }
    ]
})