<template>
    <!-- forked code, to customise -->
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10">
                <v-card class="elevation-6 mt-10">
                    <v-window v-model="step">
                        <v-window-item :value="1">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-card-text class="mt-12">
                                        <h4 class="text-center">WellNUS</h4>
                                        <h6 class="text-center grey--text">
                                            WellNUS is an app to book and track your appointments at UHC. <br>
                                            Simply book an appointment and enjoy less waiting time. <br>
                                            Book teleconsult with your doctors at the comfort of your home.
                                        </h6>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" sm="8">
                                                <v-text-field label="Email" outlined dense color="blue"
                                                    autocomplete="false" class="mt-16" />
                                                <v-text-field label="Password" outlined dense color="blue"
                                                    autocomplete="false" type="password" />
                                                <v-row>
                                                    <v-col cols="12" sm="7">
                                                        <v-checkbox label="Remember Me" class="mt-n1" color="blue">
                                                        </v-checkbox>
                                                    </v-col>
                                                    <v-col cols="12" sm="5">
                                                        <span class="caption blue--text">Forgot password</span>
                                                    </v-col>
                                                </v-row>
                                                <v-btn color="blue" dark block tile @click="signIn">Log in</v-btn>

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
                                            <h3 class="text-center">Don't Have an Account Yet?</h3>
                                            <h6 class="text-center">
                                                Let's get you all set up!
                                            </h6>
                                        </v-card-text>
                                        <div class="text-center">
                                            <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
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
                                        <h4 class="text-center">Sign Up for an Account</h4>
                                        <h6 class="text-center grey-s-text">
                                            Let's get you all set up so you can start booking your
                                            <br />
                                            first appointment
                                        </h6>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" sm="8">
                                                <v-row>
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field label="First Name" v-model="firstName" outlined
                                                            dense color="blue" autocomplete="false" class="mt-4" />
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field label="Last Name" v-model="lastName" outlined
                                                            dense color="blue" autocomplete="false" class="mt-4" />
                                                    </v-col>
                                                </v-row>
                                                <v-text-field label="Email" v-model="email" outlined dense color="blue"
                                                    autocomplete="false" />
                                                <v-text-field label="Password" v-model="password" outlined dense
                                                    color="blue" s autocomplete="false" type="password" />
                                                <v-row>
                                                    <v-col cols="12" sm="7">
                                                        <!-- <v-checkbox label="I'm a Doctor" class="mt-n1" color="blue"
                                                            v-model="isDoctor"
                                                            @change="printRole('doctor', isDoctor)"></v-checkbox> -->

                                                        <div class="d-flex align-center">
                                                            <input type="checkbox" id="doctorCheckbox"
                                                                v-model="isDoctor"
                                                                @change="printRole('doctor', isDoctor)" class="mr-2">
                                                            <label for="doctorCheckbox" class="blue--text">I'm a
                                                                Doctor</label>
                                                        </div>
                                                        <br>

                                                    </v-col>
                                                </v-row>
                                                <v-btn color="blue" dark block tile @click="signUp">Sign up</v-btn>


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
</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import 'vuetify/dist/vuetify.min.css';

export default {
    name: "Login",

    // mounted() {
    //     //Calling the ui instance
    //     var ui = firebaseui.auth.AuthUI.getInstance();
    //     if (!ui) {
    //         //we need to create the instance only one time
    //         //initialise the firebaseui widget using firebase.
    //         ui = new firebaseui.auth.AuthUI(firebase.auth());
    //     }

    //     var uiConfig = {
    //         signInSuccessURL: '/appointments',
    //         signInOptions: [
    //             firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //             firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //         ]
    //     };

    //     ui.start("#firebaseui-auth-container", uiConfig)
    // },

    data: () => ({
        step: 1,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        isDoctor: false,
    }),
    props: {
        source: String,
    },

    methods: {
        // googleSignIn() {
        //     var provider = new firebase.auth.GoogleAuthProvider();
        //     firebase.auth().signInWithPopup(provider).then((result) => {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         var token = result.credential.accessToken;
        //         // The signed-in user info.
        //         var user = result.user;
        //         // Redirect to '/appointments' or handle the login success scenario
        //         this.$router.push('/appointments');
        //     }).catch((error) => {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // The email of the user's account used.
        //         var email = error.email;
        //         // The firebase.auth.AuthCredential type that was used.
        //         var credential = error.credential;
        //         // Log the error or show an error message to the user
        //         console.error("Authentication failed:", errorMessage);
        //     });
        // },

        isValidEmail(email) {
            // Simple regex for basic email validation
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        },

        async signUp() {
            this.email = this.email.trim();
            if (!this.isValidEmail(this.email)) {
                console.error("Invalid email format.");
                alert("Invalid email format.");
                return;
            }

            if (this.password.length < 6) {
                console.error("Password must be at least 6 characters long.");
                alert("Password must be at least 6 characters long.");
                return;
            }

            try {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);

                // Now store the user data in Firestore
                const userData = {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    isDoctor: this.isDoctor,
                    // Add any additional fields you need
                };

                // Use the user's UID as the document ID in Firestore
                await firebase.firestore().collection('users').doc(userCredential.user.uid).set(userData);

                // Redirect or further signup logic here...
                this.$router.push('/appointments');
            } catch (error) {
                console.error("Error signing up:", error.message);
                alert(`Error signing up: ${error.message}`);
            }
        },


        async signIn() {
            this.email = this.email.trim();
            if (!this.isValidEmail(this.email)) {
                console.error("Invalid email format.");
                return;
            }

            try {
                const userCredential = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                // Redirect to '/appointments' or handle the login success scenario
                this.$router.push('/appointments');
            } catch (error) {
                console.error("Error signing in:", error.message);
                // Handle sign-in errors...
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
</style>