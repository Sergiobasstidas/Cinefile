import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Store from "../store";

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
    beforeEnter(to, from, next) {
      Store.dispatch("getByCategory", {
        category: "popular",
        type: "movie",
      });
      next();
    },
  },
  {
    path: "/:type/:id",
    name: "DetallePelicula",
    component: () => import("../views/DetallePelicula.vue"),
    beforeEnter: async (to, from, next) => {
      await Store.dispatch("comments/setIdMovieActive", to.params.type+'-'+to.params.id);
      await Store.dispatch("comments/traerTodosUsuarios")
      await Store.dispatch("getDetailedMovie", {
        id: to.params.id,
        type: to.params.type,
      });
      await Store.dispatch("comments/traerComentarios")
      next();
    },
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
  {
    path: "/profile",
    component: () => import("../views/Profile.vue"),
    meta: { requiresLoged: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresLoged) {
    const logedIn = Store.state.system.logedUser ? true : false;
    if (!logedIn) {
      next("/login");
    } else {
      next();
    }
  }
  next();
});

export default router;
