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
      <div id="background"></div>
      <v-container
        class="h-full d-flex justify-center align-center"
        id="content"
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

#table-header {
  text-decoration: underline;
  font-weight: bold;
}

#background {
  background: linear-gradient(-45deg, #ef7c00, #e73c7e, #0037dc, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 20s ease infinite;
  opacity: 20%;
  position: absolute;
  height: 100%;
  width: 100%;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
