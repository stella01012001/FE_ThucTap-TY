import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Menu from './components/Menu.vue'
import EventType from './components/ItemMenu/Event-Type/Index.vue'
import Block from './components/ItemMenu/Block/Index.vue'
import Customer from './components/ItemMenu/Customer/Index.vue'
import Employee from './components/ItemMenu/Employee/Index.vue'
import Floor from './components/ItemMenu/Floor/Index.vue'
import PaymentTerm from './components/ItemMenu/PaymentTerm/Index.vue'
import Unit from './components/ItemMenu/Unit/Index.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Login },
        {
            path: '/menu', component: Menu, children: [
                { path: '/menu/event-type', component: EventType },
                { path: '/menu/block', component: Block },
                { path: '/menu/customer', component: Customer },
                { path: '/menu/employee', component: Employee },
                { path: '/menu/floor', component: Floor },
                { path: '/menu/paymentterm', component: PaymentTerm },
                { path: '/menu/unit', component: Unit },
            ]
        }
    ]
})