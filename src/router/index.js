import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Favorites from "../views/Favorites.vue";

Vue.use(VueRouter);
const moment = require("moment");
require("moment/locale/es");
Vue.use(require("vue-moment"), {
  moment
});

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView
  },
  {
    path: "/favoritos",
    name: "Favorites",
    component: Favorites
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
