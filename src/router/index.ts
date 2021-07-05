import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AddUser from "../views/AddUser.vue";
import AllUsers from "../views/AllUsers.vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/usuarios",
    name: "AllUsers",
    component: AllUsers,
  },
  {
    path: "/usuario/:id",
    component: User,
    name: "User",
    props: true,
  },
  {
    path: "/adicionar-usuario",
    name: "AddUser",
    component: AddUser,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

export default router;
