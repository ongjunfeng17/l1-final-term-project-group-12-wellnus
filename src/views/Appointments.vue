<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

import PatientAppointmentTable from "@/components/tables/PatientAppointmentTable.vue";
import DoctorAppointmentTable from "@/components/tables/DoctorAppointmentTable.vue";
import PatientPastApptTable from "@/components/tables/PatientPastApptTable.vue";
//import { ref } from "vue";
import { getUserRole } from "../queries.js";

export default {
  name: "Table",
  components: {
    PatientAppointmentTable,
    DoctorAppointmentTable,
    PatientPastApptTable,
  },
  /*
  setup() {
    const userRole = ref("patient");
    return { userRole }; // make `userRole` accessible in the template
  },
  */

  data() {
    return {
      refreshComp: 0,
      user: null,
      userRole: null,
    };
  },
  methods: {
    change() {
      this.refreshComp += 1;
    },

    async userSetup(user) {
      if (!user) {
        return;
      }
      this.user = user;
      const userRole = await getUserRole(user.uid);
      this.userRole = userRole;
    },
  },

  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, this.userSetup);
  },
};
</script>

<template>
  <div v-if="user" class="w-full align-self-start">
    <v-container v-if="userRole === 'patient'">
      <h1>Upcoming Appointments</h1>
      <br />
      <PatientAppointmentTable :user="user" />
    </v-container>

    <v-container v-else-if="userRole === 'doctor'">
      <h1>Today's Active Appointments</h1>
      <br />
      <DoctorAppointmentTable :user="user" />
    </v-container>

    <v-container v-if="userRole === 'patient'">
      <h1>Past Appointments</h1>
      <br />
      <PatientPastApptTable :user="user" />
    </v-container>
  </div>
</template>

<style></style>
