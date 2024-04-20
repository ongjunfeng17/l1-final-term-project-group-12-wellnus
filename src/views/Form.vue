<script>
import AddBookingPatient from "@/components/AddBookingPatient.vue";
import AddBookingDoctor from "@/components/AddBookingDoctor.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getUserRole } from "../queries.js";

//import { ref } from "vue";

export default {
  name: "Form",
  components: {
    AddBookingPatient,
    AddBookingDoctor,
  },

  /*
  setup() {
    const userRole = ref("doctor");
    return { userRole }; // make `userRole` accessible in the template
  },
  */

  data() {
    return {
      refreshComp: 0,
      user: null,
      userRole: "hello",
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
    /*
    (user) => {
      if (user) {
        this.user = user;
      }
    });
    */
  },
};
</script>

<template>
  <div>
    <div v-if="user">
      <v-container v-if="userRole === 'patient'">
        <AddBookingPatient />
      </v-container>

      <v-container v-else-if="userRole === 'doctor'">
        <AddBookingDoctor />
      </v-container>
    </div>

    <div v-else>
      You don't seem to be logged in! Redirecting you to the login page...
    </div>
  </div>
</template>

<style scoped></style>
