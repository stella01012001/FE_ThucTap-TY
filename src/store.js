import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: null,
        id: null,
        idUnit: null,
        idRole: null,
    },
    getters: {
        user: (state) => {
            return state.user || localStorage.getItem('user');
        },
        id: (state) => {
            return state.id || localStorage.getItem('id');
        },
        idUnit: (state) => {
            return state.idUnit ;
        },
        idRole: (state) => {
            return state.idRole || localStorage.getItem('idRole');
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user);
        },
        id(context, id) {
            context.commit('id', id);
        }, 
        idUnit(context, idUnit) {
            context.commit('idUnit', idUnit);
        },
        idRole(context, idRole) {
            context.commit('idRole', idRole);
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        id(state, id) {
            state.id = id;
        },
        idUnit(state, idUnit) {
            state.idUnit = idUnit;
        },
        idRole(state, idRole) {
            state.idRole = idRole;
        },
    }
});
