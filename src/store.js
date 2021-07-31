import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: null,
        id: null
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        id: (state) => {
            return state.id;
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user);
        },
        id(context, id) {
            context.commit('id', id);
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        id(state, id) {
            state.id = id;
        },
    }
});
