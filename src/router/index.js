import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Appointments from "@/views/Appointments.vue";
import Form from "@/views/Form.vue";
import Login from "@/components/Login.vue";
import Profile from "@/views/Profile.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  { path: "/appointments", name: "Appointments", component: Appointments },
  {
    path: "/form",
    name: "Form",
    component: Form,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {path:"/profile", name: "Profile", component: Profile}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
