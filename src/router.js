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
import EUnit from './components/ItemMenu/Unit/Element.vue'
import ErrorPage from "./components/Error/404.vue"
import DS from "./components/ItemMenu/Event/DS.vue"
import DA from "./components/ItemMenu/Event/DA.vue"

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Login },
        { path: '/detail-unit/:id', component: EUnit },
        {
            path: '/menu', component: Menu, children: [
                { path: '/menu/event-type', component: EventType },
                { path: '/menu/block', component: Block },
                { path: '/menu/customer', component: Customer },
                { path: '/menu/employee', component: Employee },
                { path: '/menu/floor', component: Floor },
                { path: '/menu/paymentterm', component: PaymentTerm },
                { path: '/menu/unit', component: Unit },
                { path: '/menu/ds', component: DS },
                { path: '/menu/da', component: DA },
            ]
        },
        { path: '/404', name: 'errorpage', component: ErrorPage },//token, user
        { path: '*', redirect: '/404' }
    ]
})

// router.beforeEach((to, from, next) => {
//     const loggedIn = localStorage.getItem('token');
//     if (to.path != '/' && !loggedIn) {
//         next('/');
//     }
//     next();
// });

export default router