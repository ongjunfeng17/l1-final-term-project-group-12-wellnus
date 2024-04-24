<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserIdByEmail } from "../queries.js";

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
      giveMC: true,
      daysMC: 1,
      diagnosis: "",
    };
  },

  props: {
    appointmentId: {
      type: String,
    },
  },

  watch: {
    // Watch for changes in give MC
    giveMC() {
      this.daysMC = 0; // Reset MC to 0 when giveMC is toggled
    },
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
      }
    },

    async savetofs() {
      // Get the user input information from the form
      const {
        selectedDate,
        selectedTime,
        reasonForVisit,
        email,
        teleconsult,
        needMC,
        giveMC,
        daysMC,
        diagnosis,
      } = this;

      if (
        !selectedDate ||
        !selectedTime ||
        !teleconsult ||
        !needMC ||
        !reasonForVisit ||
        !email
      ) {
        alert("Invalid appointment");
        return;
      }

      if (!diagnosis) {
        alert("You need to fill in a valid diagnosis");
        return;
      }

      if (giveMC && daysMC == 0) {
        alert("days MC cannot be 0 if giving MC");
        return;
      }

      // TODO:
      // Follow up work such as saving the diagnosis to the database
      // Sending the MC to relevant emails
      // Dummy alert below to show that it has passed above checks:
      const appointmentId = this.$route.query.appointmentId;
      alert("Successfully attended to appointment " + appointmentId);
    },
  },
};
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-1" @keypress.native.enter="savetofs">
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

                <v-textarea
                  v-model="diagnosis"
                  label="Diagnosis"
                  outlined
                  multiline
                  rows="5"
                  color="blue"
                  autocomplete="false"
                  class="mt-1"
                />

                <v-checkbox
                  v-model="giveMC"
                  label="Give MC"
                  false-icon="$checkboxBlank"
                  true-icon="$checkboxMarked"
                ></v-checkbox>

                <v-select
                  v-model="daysMC"
                  :disabled="!giveMC"
                  :items="[1, 2, 3, 4, 5]"
                  label="Days of MC"
                  required
                  outlined
                  dense
                  class="mt-1"
                  color="blue"
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          >Select your option</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
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
