<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      user: null,
      selectedDate: "", // Initialize with today's date
      selectedTime: "",
      reasonForVisit: "", // Store the reason for the visit
      email: "",
      teleconsult: "",
      needMC: "",
      giveMC: true,
      daysMC: 1,
      diagnosis: "",
      patientId: "", // Ensure patientId is part of the data model
    };
  },

  props: {
    user: {
      type: Object,
    },
  },

  watch: {
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
        this.patientId = docData["patientId"];
      }
    },

    async savetofs() {
      if (!this.validateInputs()) {
        return;
      }

      await this.updateAppointmentRecord();

      await this.handleEmails();

      alert("Successfully attended to patient!");
      this.$router.push({ name: "Appointments" });
    },

    validateInputs() {
      const { selectedDate, selectedTime, reasonForVisit, email, teleconsult, needMC, diagnosis, daysMC, giveMC } = this;
      if (!selectedDate || !selectedTime || !teleconsult || !needMC || !reasonForVisit || !email || !diagnosis || (giveMC && daysMC == 0)) {
        alert("Please ensure all fields are correctly filled and valid.");
        return false;
      }
      return true;
    },

    async updateAppointmentRecord() {
      const { selectedDate, selectedTime, reasonForVisit, email, teleconsult, needMC, giveMC, daysMC, diagnosis, patientId } = this;
      const appointmentId = this.$route.query.appointmentId;
      const doctorId = this.user.uid;
      const doctorEmail = this.user.email;

      await setDoc(doc(db, "appointments", appointmentId), {
        diagnosis,
        daysMC,
        doctorId,
        doctorEmail,
        isAttended: true
      }, { merge: true });
    },

    async handleEmails() {
      const { patientId, daysMC, selectedDate } = this;
      const mcDocRef = doc(db, "medicalcertificates", patientId);
      const mcDocSnapshot = await getDoc(mcDocRef);

      if (mcDocSnapshot.exists()) {
        const startDate = new Date(selectedDate);
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      for (let i = 0; i < daysMC; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dayShortForm = daysOfWeek[currentDate.getDay()];
        if (mcDocSnapshot.data()[dayShortForm]) {
          mcDocSnapshot.data()[dayShortForm].forEach(email => {
          this.sendEmail(patientId, email, currentDate);
        });
      }
    }
  }
},
    getEmailsToSend(mcData, daysMC, startDate) {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let emailsToSend = [];

      for (let i = 0; i < daysMC; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dayShortForm = daysOfWeek[currentDate.getDay()];
        if (mcData[dayShortForm]) {
          emailsToSend.push(...mcData[dayShortForm]);
        }
      }

      return emailsToSend;
    },

    async sendEmail(patientId, email, date) {
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // Formats date to YYYY-MM-DD
      await addDoc(collection(db, "mail"), {
       to: email,
        message: {
          subject: "Medical Certificate Issuance Notification",
          text: `Attached to this email is the link for the requested Medical Certificate. Please note that the certificate is valid for the date: ${formattedDate}. Link to certificate: https://drive.google.com/file/d/1mpXFZtnRuB4QhYOgtNC2uVq49EoG29ZT/view?usp=sharing`
          },
        }).then(() => console.log(`Queued email for delivery on ${formattedDate}!`));
    }
  }
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
