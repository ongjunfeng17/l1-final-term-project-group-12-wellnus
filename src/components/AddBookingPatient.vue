<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      minDate: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
      user: null,
      selectedDate: null, // Initialize with today's date
      selectedTime: null,
      dateOptions: [],
      reasonForVisit: "", // Store the reason for the visit
      teleconsult: null,
      needMC: null,
    };
  },
  computed: {
    timeOptions() {
      const options = [];
      const dayOfWeek = new Date(this.selectedDate).getDay();
      let timeRanges = [];

      if ([1, 2, 3].includes(dayOfWeek)) {
        // Monday, Tuesday, Wednesday
        timeRanges = [
          { start: "08:30", end: "11:30" },
          { start: "13:30", end: "17:00" },
        ];
      } else if (dayOfWeek === 4) {
        // Thursday
        timeRanges = [
          { start: "08:30", end: "11:30" },
          { start: "13:30", end: "16:00" },
        ];
      } else if (dayOfWeek === 5) {
        // Friday
        timeRanges = [
          { start: "08:30", end: "11:30" },
          { start: "13:30", end: "16:30" },
        ];
      }

      const now = new Date();
      const currentDate = now.toISOString().split("T")[0];

      timeRanges.forEach((range) => {
        const [startHour, startMinute] = range.start.split(":").map(Number);
        const [endHour, endMinute] = range.end.split(":").map(Number);
        let currentHour = startHour;
        let currentMinute = startMinute;

        while (
          currentHour < endHour ||
          (currentHour === endHour && currentMinute <= endMinute)
        ) {
          const time = `${currentHour
            .toString()
            .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;

          // Only add time if it's at least one hour after the current time when selectedDate is today
          if (
            this.selectedDate !== currentDate ||
            new Date(`${this.selectedDate}T${time}:00`).getTime() >
              now.getTime() + 3600000
          ) {
            options.push(time);
          }

          // console.log(currentHour)

          currentMinute += 30;
          if (currentMinute >= 60) {
            currentHour += 1;
            currentMinute = 0;
          }
        }
      });

      return options;
    },
  },

  watch: {
    // Watch for changes in the date selection to update the min time accordingly
    selectedDate() {
      this.$forceUpdate(); // Force update to refresh timeOptions based on the new selectedDate
    },
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });

    this.generateDateOptions();
  },
  methods: {
    generateDateOptions() {
      const dates = [];
      const today = new Date();
      const timeZoneOffset = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
      const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      for (let i = 1; i <= 7; i++) {
        const date = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i
        );
        const sgtDate = new Date(date.getTime() + timeZoneOffset); // Adjust to Singapore Time Zone
        const dayName = weekDays[sgtDate.getDay()];

        //console.log(sgtDate.getDay() + " " + sgtDate)
        if (sgtDate.getDay() !== 0 && sgtDate.getDay() !== 6) {
          // Exclude Sundays (0) and Saturdays (6)
          dates.push(
            sgtDate.toISOString().split("T")[0] + " (" + dayName + ")"
          );
        }
      }
      this.dateOptions = dates;
    },

    async savetofs() {
      // Get the user input information from the form
      const { selectedTime, teleconsult, needMC, reasonForVisit, user } = this;
      const selectedDate = this.selectedDate.split(" ")[0];

      if (
        !selectedDate ||
        !selectedTime ||
        !teleconsult ||
        !needMC ||
        !reasonForVisit
      ) {
        alert("Please fill up all fields in the form");
        return;
      }

      alert("Booking appointment...");

      try {
        const docRef = await addDoc(collection(db, "appointments"), {
          patientId: user ? user.uid : null, // Include user ID
          email: user ? user.email : "",
          date: selectedDate,
          time: selectedTime,
          teleconsult,
          needMC,
          reasonForVisit,
          timestamp: new Date(`${selectedDate}T${selectedTime}`).getTime(),
          doctorId: "", // to be filled up when doctor attends to patient
          doctorEmail: "",
          diagnosis: "",
          isAttended: false,
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
        <v-card class="elevation-6 mt-1" @keypress.native.enter="savetofs">
          <v-card-title class="pt-5">Schedule an Appointment</v-card-title>
          <v-card-text class="pa-1">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-select
                  v-model="selectedDate"
                  :items="dateOptions"
                  label="Appointment Date"
                  required
                  outlined
                  dense
                  class="mt-1"
                  color="blue"
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Select a date</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>

                <v-select
                  v-model="selectedTime"
                  :items="timeOptions"
                  label="Appointment Time"
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

                <v-select
                  v-model="teleconsult"
                  :items="['Yes', 'No']"
                  label="Teleconsult"
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

                <v-select
                  v-model="needMC"
                  :items="['Yes', 'No']"
                  label="MC"
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

                <v-text-field
                  v-model="reasonForVisit"
                  label="Reason for Visit"
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
              <v-btn id="btn" @click="savetofs">Schedule</v-btn>
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
</style>
