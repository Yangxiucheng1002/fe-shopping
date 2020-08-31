import Vue from 'vue';
import VueRouter, {RawLocation, Route, RouteConfig} from 'vue-router';
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: '/home',
    component: (resolve) => require(['@/views/Home/index'], resolve)
  },
  {
    path: '/menu',
    component: (resolve) => require(['@/views/Menu/index'], resolve)
  },
  {
    path: '/shoppingCar',
    component: (resolve) => require(['@/views/ShoppingCar/index'], resolve)
  },
  {
    path: '/mine',
    component: (resolve) => require(['@/views/Mine/index'], resolve)
  },
];

const router: VueRouter = new VueRouter({
  mode: 'hash', // hash
  base: process.env.BASE_URL,
  routes
});


export default router;
