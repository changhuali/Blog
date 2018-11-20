const HomePage = () => import(/* webpackChunkName: "homepage" */ 'components/HomePage');

export default [
  { path: '/', component: HomePage },
];
