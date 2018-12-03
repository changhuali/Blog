const Homepage = () => import(/* webpackChunkName: "homepage" */ 'components/Homepage');
const Books = () => import(/* webpackChunkName: "books" */ 'components/Books');

export default [
  { path: '/', component: Homepage },
  { path: '/books', component: Books },
];
