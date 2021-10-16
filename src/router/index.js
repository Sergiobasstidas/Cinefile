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
    name: "Movies",
    component: () => import("../views/Movies.vue"),
  },
  {

    path: "/movie/:id",
    name: "DetallePelicula",
    component: () => import("../views/DetallePelicula.vue"),

  },
  {
     path: "/series",
    name: "Series",
    component: () => import("../views/Series.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/forgot",
    name: "Forgotpassword",
    component: () => import("../views/Forgot.vue"),
  },

//   path: "/actors",
//   name: "Actors",
//   component: () => import("../views/Login.vue"),
// },
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
