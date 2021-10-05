import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "default",
    component: Home,
  },
  {
    path: "/movies",
    name: "movies",
    component: () => import("../views/Movies.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
