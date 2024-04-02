<script>
import AddBookingStudent from "@/components/AddBookingStudent.vue";
import AddBookingDoctor from "@/components/AddBookingDoctor.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { ref } from "vue";

export default {
  name: "Form",
  components: {
    AddBookingStudent,
    AddBookingDoctor,
  },

  setup() {
    const userRole = ref("doctor");
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
    <v-container v-if="userRole === 'student'">
      <AddBookingStudent />
    </v-container>

    <v-container v-else-if="userRole === 'doctor'">
      <AddBookingDoctor />
    </v-container>
  </div>
</template>

<style scoped></style>
