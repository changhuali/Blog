import { setPathValue } from 'pathval';
export default {
  namespaced: true,
  state: {
    diaries: [
      {
        title: '',
        content: '',
        date: ''
      }
    ],
  },
  getters: {},
  mutations: {
    updateValue(state, { path, val }) {
      setPathValue(state, path, val);
    },
  },
};
