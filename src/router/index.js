import { createRouter, createWebHistory } from "vue-router";

import Appointments from "@/views/Appointments.vue";
import Form from "@/views/Form.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import DiagnosisForm from "@/views/DiagnosisForm.vue";
import ViewAppointment from "@/views/ViewAppointment.vue";

const routes = [
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
  { path: "/profile", name: "Profile", component: Profile },
  {
    path: "/diagnosis",
    name: "DiagnosisForm",
    component: DiagnosisForm,
    props: true,
  },
  {
    path: "/view-appt",
    name: "ViewAppointment",
    component: ViewAppointment,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
