import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: null,
        id: null,
        idUnit: null,
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        id: (state) => {
            return state.id;
        },
        idUnit: (state) => {
            return state.idUnit;
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
    }
});
