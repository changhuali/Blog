import { setPathValue } from 'pathval';
export default {
  namespaced: true,
  state: {
    navConfig: [
      {
        label: '个人日记',
        url: '/diary',
      },
    ],
  },
  getters: {},
  mutations: {
    updateValue(state, { path, val }) {
      setPathValue(state, path, val);
    },
  },
};
