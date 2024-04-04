<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "NavBar",
  components: { UserAvatar },
  items: [{ title: "Profile", title: "Log Out" }],

  data() {
    return {
      user: false,
      nusLogo: "/assets/logos/NUS-logo.png",
      uhcLogo: "/assets/logos/UHC-logo.png",
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.userPhoto = user?.photoURL;
      }
    });
  },
};
</script>

<template>
  <div id="logged" v-if="user">
    <div class="sticky top-0 z-10 w-full shadow-xl">
      <v-container .align-center .justify-center fluid class="p-8">
        <v-row align-center justify-center fluid>
          <v-row cols="2" dense
            ><v-col
              ><v-img
                :src="nusLogo"
                aspect-ratio="1"
                max-height="60"
                max-width="140"
              ></v-img></v-col
            ><v-col
              ><v-img
                :src="uhcLogo"
                aspect-ratio="1"
                max-height="60"
                max-width="140"
              ></v-img></v-col
          ></v-row>
          <v-col cols="8" class="">
            <v-row>
              <v-col>
                <router-link to="appointments"> Appointments </router-link>
              </v-col>
              <v-col> <router-link to="form"> Form </router-link></v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props">
                  <UserAvatar :user="user" :userPhoto="user?.photoURL" />
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style></style>
