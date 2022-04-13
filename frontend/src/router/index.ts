import Home from "@/views/home.vue";
import UserAdd from "@/views/user-add.vue";
import UserList from "@/views/user-list.vue";
import User from "@/views/user.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/usuarios",
    name: "user-list",
    component: UserList,
  },
  {
    path: "/usuario/:id",
    component: User,
    name: "user",
    props: true,
  },
  {
    path: "/adicionar-usuario",
    name: "user-add",
    component: UserAdd,
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
