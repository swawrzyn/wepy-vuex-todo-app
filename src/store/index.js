import wepy from '@wepy/core';

import Vuex from '@wepy/x';
import _ from 'lodash';


wepy.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
  mutations: {
    ADD_TODO(state, payload) {
      state.todos.push(payload);
    },
    UPDATE_TODO(state, payload) {
      const todoIndex = state.todos.findIndex((t) => t.id === payload.id);

      if (todoIndex < 0) return;

      const newTodos = _.cloneDeep(state.todos);
      newTodos.splice(todoIndex, 1, payload);
      state.todos = newTodos;
    },
    DELETE_TODO(state, payload) {
      const todoIndex = state.todos.findIndex((t) => t.id === payload.id);

      if (todoIndex < 0) return;

      const newTodos = _.cloneDeep(state.todos);

      newTodos.splice(todoIndex, 1);

      state.todos = newTodos;
    },
    SET_STATE(state, payload) {
      state.todos = payload.todos;
    }
  },
  actions: {
    CREATE_NEW_TODO({ commit }, payload) {
      commit('ADD_TODO', payload);
    },
    CHANGE_TODO({ commit }, payload) {
      commit('UPDATE_TODO', payload);
    },
    REMOVE_TODO({ commit }, payload) {
      commit('DELETE_TODO', payload);
    },
    INIT_STATE({commit}, payload) {
      commit('SET_STATE', payload);
    }
  },
  getters: {
    NEXT_ID(state) {
      if (state.todos.length === 0) return 1;

      return _.maxBy(state.todos, (t) => t.id).id + 1;
    }
  }
});
