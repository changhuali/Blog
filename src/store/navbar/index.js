import { setPathValue } from 'pathval';
export default {
  namespaced: true,
  state: {
    navConfig: [
      {
        label: '首页',
        url: '/',
      },
      {
        label: '日记',
        url: '/diary',
      },
      {
        label: '分享',
        url: '/share',
      },
      {
        label: '书橱',
        url: '/book',
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
