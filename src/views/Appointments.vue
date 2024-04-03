<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

import PatientAppointmentTable from "@/components/tables/PatientAppointmentTable.vue";
import DoctorAppointmentTable from "@/components/tables/DoctorAppointmentTable.vue";
import PatientPastApptTable from "@/components/tables/PatientPastApptTable.vue";
import { ref } from "vue";

export default {
  name: "Table",
  components: {
    PatientAppointmentTable,
    DoctorAppointmentTable,
    PatientPastApptTable
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
      <PatientPastApptTable />
    </v-container>

    <v-container v-else-if="userRole === 'doctor'">
      <DoctorAppointmentTable />
    </v-container>
  </div>
</template>

<style></style>
