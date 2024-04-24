<script>
import AddDiagnosis from "@/components/AddDiagnosis.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserRole } from "../queries.js";

export default {
  name: "DiagnosisForm",
  components: {
    AddDiagnosis,
  },

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
  },
};
</script>

<template>
  
  <v-container>
    <div v-if="userRole === 'patient'">
    </div>
    <div v-else-if="userRole === 'doctor'">
      <AddDiagnosis :user="user"/>
    </div>
    <div v-else>
      You don't seem to be logged in! Redirecting you to the login page...
    </div>
  </v-container>
</template>

<style scoped></style>
