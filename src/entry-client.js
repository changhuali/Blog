// es6 shim
import 'babel-polyfill';
import { createApp } from './app';

const { app, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

app.$mount('#vue-view');
