<template>
  <v-container class="d-flex align-center justify-center h-full w-full bg-red">
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar.show = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>

    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6 mt-10">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center"
                        style="
                          color: rgb(23, 60, 124);
                          font-size: 36px;
                          font-weight: bold;
                        "
                      >
                        WellNUS
                      </h1>
                      <br /><br />
                      <h6 class="text-center grey--text">
                        WellNUS is an app to book and track your appointments at
                        UHC. <br />
                        Simply schedule an appointment and proceed directly to
                        UHC at your designated time, avoiding lengthy wait
                        times. <br />
                        Book teleconsults with your doctors at the comfort of
                        your home.
                      </h6>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-text-field
                            v-model="email"
                            label="Email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            class="mt-8"
                          />
                          <v-text-field
                            v-model="password"
                            label="Password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            type="password"
                          />
                          <v-row>
                            <v-col cols="6" sm="6">
                              <div class="d-flex align-center">
                                <input
                                  type="checkbox"
                                  id="rememberMeCheckbox"
                                  v-model="rememberMe"
                                  @change="printRememberMeState(rememberMe)"
                                  class="mr-2"
                                />
                                <label
                                  for="rememberMeCheckbox"
                                  class="blue--text no-hover"
                                  >Remember me</label
                                >
                              </div>
                              <!-- <v-checkbox label="Remember Me" v-model="rememberMe" class="mt-n1" color="blue">
                                                        </v-checkbox> -->
                            </v-col>
                            <v-col cols="6" sm="6" class="d-flex justify-end">
                              <span
                                class="caption blue--text hover-change-color"
                                @click="resetPassword"
                                style="cursor: pointer"
                                >Forgot password?</span
                              >
                            </v-col>
                          </v-row>
                          <br />
                          <v-btn
                            color="blue"
                            dark
                            block
                            tile
                            @click="signIn"
                            class="mb-12"
                            >Log in</v-btn
                          >

                          <!-- <h5 class="text-center grey--text mt-4 mb-3">
                                                    Or
                                                </h5>

                                                <v-btn color="red" dark block tile @click="googleSignIn">
                                                    Sign in with Google
                                                </v-btn> -->
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="6" class="blue rounded-bl-xl">
                    <div style="text-align: center; padding: 180px 0">
                      <v-card-text class="white--text">
                        <v-row>
                          <v-col cols="6" sm="6" class="d-flex justify-end pr-1"
                            ><v-img
                              :src="nusLogo"
                              aspect-ratio="1"
                              max-height="60"
                              max-width="140"
                            ></v-img
                          ></v-col>
                          <v-col cols="6" sm="6" class="pl-1"
                            ><v-img
                              :src="uhcLogo"
                              aspect-ratio="1"
                              max-height="60"
                              max-width="140"
                            ></v-img
                          ></v-col>
                        </v-row>
                        <br />
                        <h3 class="text-center">Don't Have an Account Yet?</h3>
                        <h6 class="text-center">Let's get you all set up!</h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step++"
                          >SIGN UP</v-btn
                        >
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row>
                  <v-col cols="12" md="6" class="blue rounded-br-xl">
                    <div style="text-align: center; padding: 180px 0">
                      <v-card-text class="white--text">
                        <v-row>
                          <v-col cols="6" sm="6" class="d-flex justify-end pr-1"
                            ><v-img
                              :src="nusLogo"
                              aspect-ratio="1"
                              max-height="60"
                              max-width="140"
                            ></v-img
                          ></v-col>
                          <v-col cols="6" sm="6" class="pl-1"
                            ><v-img
                              :src="uhcLogo"
                              aspect-ratio="1"
                              max-height="60"
                              max-width="140"
                            ></v-img
                          ></v-col>
                        </v-row>
                        <br />
                        <h3 class="text-center">Already Signed up?</h3>
                        <h6 class="text-center">
                          Log in to your account right here!
                        </h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step--">Log in</v-btn>
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <h2
                        class="text-center"
                        style="
                          color: rgb(23, 60, 124);
                          font-size: 20px;
                          font-weight: bold;
                        "
                      >
                        Sign Up for an Account
                      </h2>
                      <br />
                      <h6 class="text-center grey-s-text">
                        Let's get you all set up so you can start <br />
                        booking your first appointment
                      </h6>
                      <br />
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-row>
                            <v-col cols="12" sm="6">
                              <v-text-field
                                label="First Name"
                                v-model="firstName"
                                outlined
                                dense
                                color="blue"
                                autocomplete="false"
                                class="mt-4"
                              />
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field
                                label="Last Name"
                                v-model="lastName"
                                outlined
                                dense
                                color="blue"
                                autocomplete="false"
                                class="mt-4"
                              />
                            </v-col>
                          </v-row>
                          <v-text-field
                            label="Email"
                            v-model="email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                          />
                          <v-text-field
                            label="Password"
                            v-model="password"
                            outlined
                            dense
                            color="blue"
                            s
                            autocomplete="false"
                            type="password"
                          />
                          <v-row>
                            <v-col cols="12" sm="12">
                              <!-- <v-checkbox label="I'm a Doctor" class="mt-n1" color="blue"
                                                            v-model="isDoctor"
                                                            @change="printRole('doctor', isDoctor)"></v-checkbox> -->

                              <div class="d-flex align-center justify-center">
                                <input
                                  type="checkbox"
                                  id="doctorCheckbox"
                                  v-model="isDoctor"
                                  @change="printRole('doctor', isDoctor)"
                                  class="mr-2"
                                />
                                <label
                                  for="doctorCheckbox"
                                  class="blue--text no-hover"
                                  >I'm a Doctor</label
                                >
                              </div>
                              <br />
                            </v-col>
                          </v-row>
                          <v-btn
                            color="blue"
                            dark
                            block
                            tile
                            @click="signUp"
                            class="mb-12"
                            >Sign up</v-btn
                          >

                          <!-- <h5 class="text-center grey--text mt-4 mb-3">
                                                    Or Sign up using
                                                </h5>

                                                <v-btn color="red" dark block tile @click="googleSignIn">
                                                    Sign up with Google
                                                </v-btn> -->
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import "vuetify/dist/vuetify.min.css";

export default {
  name: "Login",

  data: () => ({
    step: 1,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isDoctor: false,
    rememberMe: false,
    nusLogo: "/assets/logos/NUS-logo.png",
    uhcLogo: "/assets/logos/UHC-logo.png",
    snackbar: {
      show: false,
      message: "",
      timeout: 6000, // milliseconds
      color: "red",
    },
  }),
  props: {
    source: String,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, redirect them to the home page
        this.$router.push("/appointments");
        console.log("past user");
      } else {
      }
    });
  },

  methods: {
    showSnackbar(message, color = "red") {
      this.snackbar.message = message;
      this.snackbar.show = true;
      this.snackbar.color = color;
    },

    isValidEmail(email) {
      // Simple regex for basic email validation
      const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },

    async signUp() {
      this.email = this.email.trim();
      if (!this.isValidEmail(this.email)) {
        console.error("Invalid email format.");
        this.showSnackbar("Invalid email format.", "red");
        return;
      }

      if (this.password.length < 6) {
        console.error("Password must be at least 6 characters long.");
        this.showSnackbar(
          "Password must be at least 6 characters long.",
          "red"
        );
        return;
      }

      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);

        // Now store the user data in Firestore
        const userData = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          isDoctor: this.isDoctor,
          // Add any additional fields you need
        };

        // Use the user's UID as the document ID in Firestore
        await firebase
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .set(userData);

        // Redirect or further signup logic here...
        this.$router.push("/appointments");
      } catch (error) {
        console.error("Error signing up:", error.message);
        this.showSnackbar(`Error signing up: ${error.message}`, "red");
      }
    },

    async signIn() {
      this.email = this.email.trim();
      if (!this.isValidEmail(this.email)) {
        console.error("Invalid email format.");
        this.showSnackbar("Invalid email format.", "red");
        return;
      }
      const persistenceType = this.rememberMe
        ? firebase.auth.Auth.Persistence.LOCAL
        : firebase.auth.Auth.Persistence.SESSION;

      try {
        await firebase.auth().setPersistence(persistenceType);
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        // Redirect to '/appointments' or handle the login success scenario
        this.$router.push("/appointments");
      } catch (error) {
        console.error("Error signing in:", error.message);
        // Check if the error code is for a wrong password
        if (error.code === "auth/invalid-credential") {
          this.showSnackbar(
            "The password you entered is incorrect. Please try again.",
            "red"
          );
        } else {
          // For other types of errors, you might want to handle them differently or show a generic error message
          this.showSnackbar(`Error signing in: ${error.message}`, "red");
        }
      }
    },

    async resetPassword() {
      this.email = this.email.trim();
      console.log(this.email);
      if (!this.isValidEmail(this.email)) {
        console.error("Invalid email format.");
        this.showSnackbar(
          "Invalid email format. Please enter a valid email address to reset your password.",
          "red"
        );
        return;
      }

      try {
        await firebase.auth().sendPasswordResetEmail(this.email);
        this.showSnackbar(
          "Password reset email sent. Please check your inbox.",
          "blue"
        );
      } catch (error) {
        console.error("Error sending password reset email:", error.message);
        this.showSnackbar(
          `Error sending password reset email: ${error.message}`,
          "red"
        );
      }
    },

    printRole(role, state) {
      if (state) {
        console.log(`The user is a ${role}.`);
      } else {
        console.log(`The user is not a ${role}.`);
      }
    },
  },
};
</script>

<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}

.hover-change-color:hover {
  color: rgb(238, 124, 48);
  cursor: pointer;
}

.blue--text.no-hover:hover {
  color: inherit;
  /* Keeps the color unchanged on hover */
  cursor: pointer;
}
</style>
