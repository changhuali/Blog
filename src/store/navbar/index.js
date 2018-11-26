import { setPathValue } from 'pathval';
export default {
  namespaced: true,
  state: {
    navConfig: [
      {
        label: '日记',
        url: '/diaries',
      },
      {
        label: '书橱',
        url: '/books',
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
