import { setPathValue } from 'pathval';
export default {
  namespaced: true,
  state: {
    username: 'changhua.li',
    sex: '男',
    birthday: '1993-06-05',
  },
  getters: {},
  mutations: {
    updateValue(state, { path, val }) {
      setPathValue(state, path, val);
    },
  },
  actions: {
    updateValueAction({ commit }, { path, val }) {
      commit('updateValue', { path, val });
      commit('diary/updateValue', { path, val }, { root: true });
    }
  },
};
