<template>
  <v-btn id="btn" @click="signOut()" v-if="user"> Logout </v-btn>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "LogOut",

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser;
  },

  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$emit('logout');
        this.$router.push({ name: "Login" });
      }).catch((error) => {
        console.error("Logout Failed", error);
      });
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
