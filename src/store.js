import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: null,
        id: null,
        idRole: null,
    },
    getters: {
        user: (state) => {
            return state.user || localStorage.getItem('user');
        },
        id: (state) => {
            return state.id || localStorage.getItem('id');
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
        idRole(state, idRole) {
            state.idRole = idRole;
        },
    }
});
