<script setup>
import PatientAppointmentTable from "@/components/tables/PatientAppointmentTable.vue";
import DoctorAppointmentTable from "@/components/tables/DoctorAppointmentTable.vue";
import { ref } from "vue";
const userRole = ref("student");
</script>

<template>
  <div>
    <v-container v-if="userRole === 'student'">
      <PatientAppointmentTable />
    </v-container>

    <v-container v-else-if="userRole === 'doctor'"
      ><DoctorAppointmentTable
    /></v-container>
  </div>
</template>

<style scoped></style>
