<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

import UserAvatar from "@/components/UserAvatar.vue";
import LogOut from "@/components/LogOut.vue";

export default {
  name: "NavBar",
  components: { UserAvatar, LogOut },

  data() {
    return {
      user: false,
      nusLogo: "/assets/logos/NUS-logo.png",
      uhcLogo: "/assets/logos/UHC-logo.png",
      items: [{ title: "Profile" }, { title: "LogOut" }],
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

  methods: {
    handleLogout() {
      // Handle logout (e.g., update UI, clear data)
      console.log("Logged out!");
      this.user = null; // Update user state
    },
  },
};
</script>

<template>
  <div id="logged" v-if="user">
    <div class="sticky top-0 z-10 w-full shadow-xl">
      <v-container .align-center .justify-center fluid class="p-8">
        <v-row fluid class="d-flex justify-center align-center">
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
                <router-link to="appointments" class="nav-link">
                  Appointments
                </router-link>
              </v-col>
              <v-col>
                <router-link to="form" class="nav-link">
                  Form
                </router-link></v-col
              >
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <UserAvatar
                  :user="user"
                  :userPhoto="user?.photoURL"
                  v-bind="props"
                />
              </template>

              <v-list>
                <v-list-item>
                  <v-btn class="hover:bg-red" id="btn" to="/profile">
                    Profile
                  </v-btn>
                </v-list-item>
                <v-list-item><LogOut @logout="handleLogout" /></v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: rgb(23, 60, 124) !important;
  position: relative;
}

.router-link-active::after {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(23, 60, 124);
  bottom: 0px;
  left: 0;
}

.nav-link {
  text-decoration: none;
  color: rgb(23, 60, 124);
  padding: 10px 15px;
  display: inline-block;
}
</style>
