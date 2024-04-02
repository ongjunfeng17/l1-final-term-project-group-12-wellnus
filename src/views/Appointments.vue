<script>
import LogOut from "@/components/LogOut.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import PatientAppointmentTable from "@/components/tables/PatientAppointmentTable.vue";
import DoctorAppointmentTable from "@/components/tables/DoctorAppointmentTable.vue";
import { ref } from "vue";

export default {
  name: "Table",
  components: {
    LogOut,
    PatientAppointmentTable,
    DoctorAppointmentTable,
  },

  setup() {
    const userRole = ref("student");
    return { userRole }; // make `userRole` accessible in the template
  },

  data() {
    return {
      refreshComp: 0,
      user: null,
    };
  },
  methods: {
    change() {
      this.refreshComp += 1;
    },
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<template>
  <div v-if="user">
    Upcoming Appointments
    <v-container v-if="userRole === 'student'">
      <PatientAppointmentTable />
    </v-container>

    <v-container v-else-if="userRole === 'doctor'">
      <DoctorAppointmentTable />
    </v-container>

    Past Appointments
    <v-container v-if="userRole === 'student'">
      <PatientAppointmentTable />
    </v-container>

    <v-container v-else-if="userRole === 'doctor'">
      <DoctorAppointmentTable />
    </v-container>

    <LogOut />
  </div>
</template>

<style></style>
