<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      selectedDate: "", // Initialize with today's date
      selectedTime: "",
      reasonForVisit: "", // Store the reason for the visit
      email: "",
      teleconsult: "",
      needMC: "",
      daysMC: 0,
      diagnosis: "",
      doctorEmail: "",
      diagnosis: "",
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    this.initialize();
  },

  methods: {
    async initialize() {
      const appointmentId = this.$route.query.appointmentId;
      const docRef = doc(db, "appointments", appointmentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        this.selectedDate = docData["date"];
        this.selectedTime = docData["time"];
        this.reasonForVisit = docData["reasonForVisit"];
        this.email = docData["email"];
        this.teleconsult = docData["teleconsult"];
        this.needMC = docData["needMC"];
        this.doctorEmail = docData["doctorEmail"];
        this.daysMC = docData["daysMC"] ? docData["daysMC"] : 0;
        this.diagnosis = docData["diagnosis"];
      }
    },
  },
};
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-1">
          <v-card-title class="pt-5">Medical Diagnosis</v-card-title>
          <v-card-text class="pa-1">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-card-text class="section-title">
                  Appointment Details
                </v-card-text>

                <v-text-field
                  v-model="selectedDate"
                  label="Appointment Date"
                  color="blue"
                  readonly
                />

                <v-text-field
                  v-model="selectedTime"
                  label="Appointment Time"
                  color="blue"
                  readonly
                />

                <v-text-field
                  v-model="teleconsult"
                  label="Teleconsult"
                  color="blue"
                  readonly
                />

                <v-text-field
                  v-model="needMC"
                  label="MC Request"
                  color="blue"
                  readonly
                />

                <v-text-field
                  v-model="email"
                  label="Patient Email"
                  color="blue"
                  readonly
                />

                <v-textarea
                  v-model="reasonForVisit"
                  label="Reason for Visit"
                  color="blue"
                  rows="3"
                  readonly
                />

                <v-card-title class="section-title">
                  Doctor's Section
                </v-card-title>

                <v-text-field
                  v-model="doctorEmail"
                  label="Doctor"
                  required
                  outlined
                  dense
                  class="mt-1"
                  color="blue"
                  readonly
                />

                <v-textarea
                  v-model="diagnosis"
                  label="Diagnosis"
                  outlined
                  multiline
                  rows="5"
                  color="blue"
                  autocomplete="false"
                  class="mt-1"
                  readonly
                />

                <v-text-field
                  v-model="daysMC"
                  label="Days of MC"
                  required
                  outlined
                  dense
                  class="mt-1"
                  color="blue"
                  readonly
                />
                
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

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

.pt-5 {
  font-size: 25px;
}

.section-title {
  font-size: 17px;
  color: rgb(23, 60, 124);
}
</style>
