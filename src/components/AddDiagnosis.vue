<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserIdByEmail } from "../queries.js";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      minDate: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
      user: null,
      selectedDate: "2024-04-24", // Initialize with today's date
      selectedTime: "11:00",
      dateOptions: [],
      reasonForVisit: "", // Store the reason for the visit
      email: "",
      teleconsult: "Yes",
      needMC: "Yes",
      enableOptionalField: false
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
    async savetofs() {
      // Get the user input information from the form
      const { selectedTime, teleconsult, needMC, reasonForVisit, email, user } =
        this;
      const selectedDate = this.selectedDate.split(" ")[0];

      if (
        !selectedDate ||
        !selectedTime ||
        !teleconsult ||
        !needMC ||
        !reasonForVisit ||
        !email
      ) {
        alert("Please fill up all fields in the form");
        return;
      }

      const patientId = await getUserIdByEmail(email);
      if (patientId === "") {
        alert("You have entered an invalid patient email, please try again.");
        return;
      }

      alert("Booking appointment...");

      try {
        const docRef = await addDoc(collection(db, "appointments"), {
          patientId: patientId, // Include user ID
          email: email,
          date: selectedDate,
          time: selectedTime,
          teleconsult,
          needMC,
          reasonForVisit,
          timestamp: new Date(`${selectedDate}T${selectedTime}`).getTime(),
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Appointment booked successfully!");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to book appointment. Please try again.");
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

                <v-text-field
                  v-model="reasonForVisit"
                  label="Reason for Visit"
                  color="blue"
                  readonly
                />

                <v-card-title class="section-title">
                  Doctor's Section
                </v-card-title>

                <v-textarea
                  v-model="longDescription"
                  label="Diagnosis"
                  outlined
                  multiline
                  rows="5"
                  color="blue"
                  autocomplete="false"
                  class="mt-1"
                />

                <v-checkbox 
                  v-model="enableOptionalField" 
                  label="Give MC" 
                  false-icon="$checkboxBlank"
                  true-icon="$checkboxMarked"
                ></v-checkbox>

                <v-text-field
                  v-model="optionalFieldValue"
                  :disabled="!enableOptionalField"
                  label="Number of Days of MC"
                  outlined
                  dense
                  color="blue"
                  autocomplete="false"
                  class="mt-1"
                />

              </v-col>
            </v-row>
          </v-card-text>
          <v-row justify="center">
            <v-col cols="6" sm="4" class="mb-5">
              <v-btn id="btn" @click="savetofs">Save</v-btn>
            </v-col>
          </v-row>
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
