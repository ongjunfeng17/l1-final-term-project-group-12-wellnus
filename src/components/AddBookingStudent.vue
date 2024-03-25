<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp)

export default {
    methods: {
        async savetofs() {
            console.log("IN AC")

            let Date = document.getElementById("date").value;
            let Time = document.getElementById("time").value;
            let Teleconsult = document.getElementById("teleconsult").value;

            alert("Booking appointment...");

            try {
                const docRef = await setDoc(doc(db, "Student Appointments", coin), {
                    Date: date,
                    Time: time,
                    Teleconsult: teleconsult,
                })
                console.log(docRef)
                document.getElementById('myform').reset();
                this.$emit("added")
            }
            catch (error) {
                console.error("Error adding document: ", error);
            }
        }
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
                <input type="date" id="date" required="" placeholder="Enter Date" />
                <br /><br />

                <label for="time">Appointment Time: </label>
                <input type="time" id="time" required="" placeholder="Enter Time" step="1800"/>
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

input, select {
    border: 2px solid #85a392; /* Example border style */
    border-radius: 4px; /* Rounded corners */
    padding: 8px; /* Some padding for visual comfort */
    margin-bottom: 10px; /* Space below each element */
}

input:hover {
    box-shadow: 3px 3px rgb(129, 184, 99);
    border-radius: 2px;
}

.save {
    text-align: center;
}

#savebutton {
    border: 2px solid #85a392; /* Matching the form elements */
    background-color: #f3f3f3; /* Light background */
    border-radius: 4px; /* Rounded corners */
    padding: 10px 20px; /* Padding for a larger clickable area */
    cursor: pointer; /* Change mouse pointer to indicate it's clickable */
}

#savebutton:hover {
    background-color: #e2e2e2; /* Slightly darker on hover */
}
</style>
