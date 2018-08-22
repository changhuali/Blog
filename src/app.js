import Vue from 'vue';
import App from 'components/App';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';

export function createApp() {
  // 创建并注入router和store
  const router = createRouter();
  const store = createStore();
  // 将路由数据同步到store.route
  sync(store, router);
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });
  return { app, router, store };
}
