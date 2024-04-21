<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<template>
  <v-app>
    <NavBar />
    <v-container fluid class="pa-0 h-full align-center justify-center">
      <v-container class="h-full d-flex justify-center align-center"
        ><router-view class="w-full"
      /></v-container>
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

#btn {
  text-align: center;
  margin: auto;
  background-color: rgb(0, 61, 124);
  color: white;
}
#btn:hover {
  background-color: rgb(239, 124, 0);
}
</style>
