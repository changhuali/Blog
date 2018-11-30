const Homepage = () => import(/* webpackChunkName: "homepage" */ 'components/Homepage');
const Test = () => import(/* webpackChunkName: "Test" */ 'components/Test');

export default [
  { path: '/', component: Homepage },
  { path: '/diary', component: Test },
];
