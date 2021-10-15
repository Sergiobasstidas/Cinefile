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
    path: "/:type/:id",
    name: "DetallePelicula",
    component: () => import("../views/DetallePelicula.vue"),
  },
  {
    path: "/series",
    name: "series",
    component: () => import("../views/Series.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
