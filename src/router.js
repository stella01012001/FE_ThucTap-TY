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
import Ele_PaymentTerm from './components/ItemMenu/PaymentTerm/Element.vue'


import Unit from './components/ItemMenu/Unit/Index.vue'
import UnitTest from './components/ItemMenu/Unit/Test.vue'
import EUnit from './components/ItemMenu/Unit/Element.vue'
import AUnit from './components/ItemMenu/Unit/AddUnit.vue'
import ErrorPage from "./components/Error/404.vue"
import DS from "./components/ItemMenu/Event/DS.vue"
import ListDS from "./components/ItemMenu/Event/ListDS.vue"
import ListDA from "./components/ItemMenu/Event/ListDA.vue"
import ListCTR from "./components/ItemMenu/Event/ListContract.vue"
import DA from "./components/ItemMenu/Event/DA.vue"
import CTR from "./components/ItemMenu/Event/Contract.vue"
import LGCTR from "./components/ItemMenu/LedgerContract/Index.vue"
import Period from "./components/ItemMenu/Period/Index.vue"
import Account from "./components/ItemMenu/Account/Index.vue"
import AccountE from "./components/ItemMenu/Account/Element.vue"
import PeriodSendMailDueDate from "./components/ItemMenu/Period/SendMailDueDate.vue"

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Login },
        { path: '/detail-unit/:id', component: EUnit },
        { path: '/add-unit/', component: AUnit },
        { path: '/test/', component: UnitTest },
        { path: '/add-account/', component: AccountE },
        {
            path: '/menu', component: Menu, children: [
                { path: '/menu/event-type', component: EventType },
                { path: '/menu/block', component: Block },
                { path: '/menu/customer', component: Customer },
                { path: '/menu/employee', component: Employee },
                { path: '/menu/floor', component: Floor },
                { path: '/menu/paymentterm', component: PaymentTerm },
                { path: '/menu/paymentterm/:id', component: Ele_PaymentTerm },
                { path: '/menu/unit', component: Unit },
                { path: '/menu/ds', component: DS },
                { path: '/menu/list-ds', component: ListDS },
                { path: '/menu/list-da', component: ListDA },
                { path: '/menu/list-ctr', component: ListCTR },
                { path: '/menu/da', component: DA },
                { path: '/menu/ctr', component: CTR },
                { path: '/menu/lgctr', component: LGCTR },
                { path: '/menu/period', component: Period },
                { path: '/menu/account', component: Account },
                { path: '/menu/period-mail/:id', component: PeriodSendMailDueDate },
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