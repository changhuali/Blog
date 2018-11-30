const Homepage = () => import(/* webpackChunkName: "homepage" */ 'components/Homepage');

export default [
  { path: '/', component: Homepage },
];
