<template>
  <v-btn id="btn" @click="signOut()" v-if="user"> Logout </v-btn>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "Logout",

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },

  methods: {
    signOut() {
      const auth = getAuth();
      const user = auth.currentUser;
      signOut(auth, user);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
#btn {
  text-align: center;
  margin: auto;
  background-color: rgb(68, 127, 204);
  color: white;
}

#btn:hover {
  background-color: rgb(100, 98, 97);
  box-shadow: 3px 3px grey;
}
</style>
