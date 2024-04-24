<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

import PatientAppointmentTable from "@/components/tables/PatientAppointmentTable.vue";
import DoctorAppointmentTable from "@/components/tables/DoctorAppointmentTable.vue";
import PatientPastApptTable from "@/components/tables/PatientPastApptTable.vue";
import DoctorPastApptTable from "@/components/tables/DoctorPastApptTable.vue";
//import { ref } from "vue";
import { getUserRole } from "../queries.js";

export default {
  name: "Table",
  components: {
    PatientAppointmentTable,
    DoctorAppointmentTable,
    PatientPastApptTable,
    DoctorPastApptTable,
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
  <v-card v-if="user" class="align-self-start">
    <v-container v-if="userRole === 'patient'" class="d-flex flex-column ga-16">
      <PatientAppointmentTable :user="user" />
      <PatientPastApptTable :user="user" />
    </v-container>

    <v-container
      v-else-if="userRole === 'doctor'"
      class="d-flex flex-column ga-16"
    >
      <DoctorAppointmentTable :user="user" />

      <DoctorPastApptTable :user="user" />
    </v-container>
  </v-card>
</template>

<style></style>
