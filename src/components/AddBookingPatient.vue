<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp)

export default {
    data() {
        return {
            minDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
            user: null,
            selectedDate: new Date().toISOString().split('T')[0], // Initialize with today's date
            selectedTime: '',
        };
    },

    computed: {
        timeOptions() {
            const options = [];
            // Convert the selectedDate to a Date object and get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
            const dayOfWeek = new Date(this.selectedDate).getDay();
            let timeRanges = [];

            // Define time ranges for each day
            if ([1, 2, 3].includes(dayOfWeek)) { // Monday, Tuesday, Wednesday
                timeRanges = [
                    { start: '08:30', end: '11:30' },
                    { start: '13:30', end: '17:00' }
                ];
            } else if (dayOfWeek === 4) { // Thursday
                timeRanges = [
                    { start: '08:30', end: '11:30' },
                    { start: '13:30', end: '16:00' }
                ];
            } else if (dayOfWeek === 5) { // Friday
                timeRanges = [
                    { start: '08:30', end: '11:30' },
                    { start: '13:30', end: '16:30' }
                ];
            }

            // Generate time options based on the defined time ranges
            timeRanges.forEach(range => {
                const [startHour, startMinute] = range.start.split(':').map(Number);
                const [endHour, endMinute] = range.end.split(':').map(Number);
                let currentHour = startHour;
                let currentMinute = startMinute;

                while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
                    // Format time as "HH:MM"
                    const time = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
                    options.push(time);

                    // Increment time by 30 minutes
                    currentMinute += 30;
                    if (currentMinute >= 60) {
                        currentHour += 1;
                        currentMinute = 0;
                    }
                }
            });

            return options;
        }
    },

    watch: {
        // Watch for changes in the date selection to update the min time accordingly
        selectedDate(newDate, oldDate) {
            this.selectedDate = newDate;
        }
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
            console.log("IN AC")

            let date = document.getElementById("date").value;
            let time = document.getElementById("time").value;
            let teleconsult = document.getElementById("teleconsult").value;
            const timestamp = new Date(`${date}T${time}`).valueOf();
            
            alert("Booking appointment...");

            try {
                console.log(String(this.user.email));
                console.log(this.user.uid);
                const docRef = await addDoc(collection(db, "appointments"), {
                    patientId: this.user.uid,
                    date: date,
                    time: time,
                    teleconsult: teleconsult,
                    timestamp: timestamp
                });
                console.log(docRef);
                document.getElementById('myform').reset();
                this.$emit("added");
            }
            catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        
    }
};
</script>

<template>
    <div class="container">
        <form id="myform">
            <h2>Book an Appointment</h2>
            <br /><br />

            <div class="formli">
                <label for="date">Appointment Date: </label>
                <input type="date" id="date" v-model="selectedDate" :min="minDate" required=""
                    placeholder="Enter Date" />
                <br /><br />

                <label for="time">Appointment Time: </label>
                <select id="time" required v-model="selectedTime">
                    <option value="" disabled selected>Select your option</option>
                    <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
                <br /><br />

                <label for="teleconsult">Teleconsult: </label>
                <select id="teleconsult" required>
                    <option value="" disabled selected>Select your option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <br /><br />

                <div class="save">
                    <button id="savebutton" type="button" v-on:click="savetofs">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
h2 {
    background-color: rgb(129, 184, 99);
}

.formli {
    display: inline-block;
    text-align: left;
}

form {
    text-align: center;
    align-items: center;
    margin: auto;
}

input,
select {
    border: 2px solid #85a392;
    /* Example border style */
    border-radius: 4px;
    /* Rounded corners */
    padding: 8px;
    /* Some padding for visual comfort */
    margin-bottom: 10px;
    /* Space below each element */
}

input:hover {
    box-shadow: 3px 3px rgb(129, 184, 99);
    border-radius: 2px;
}

.save {
    text-align: center;
}

#savebutton {
    border: 2px solid #85a392;
    /* Matching the form elements */
    background-color: #f3f3f3;
    /* Light background */
    border-radius: 4px;
    /* Rounded corners */
    padding: 10px 20px;
    /* Padding for a larger clickable area */
    cursor: pointer;
    /* Change mouse pointer to indicate it's clickable */
}

#savebutton:hover {
    background-color: #e2e2e2;
    /* Slightly darker on hover */
}
</style>
