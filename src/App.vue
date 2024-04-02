<script>
import NavBar from "@/components/NavBar.vue";
import LogOut from "@/components/LogOut.vue";

export default {
  name: "App",
  components: {
    NavBar,
    LogOut,
  },
};
</script>

<template>
  <v-app>
    <v-container fluid class="pa-0">
      <NavBar />
      <v-container><router-view /></v-container>
      <LogOut />
    </v-container>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
