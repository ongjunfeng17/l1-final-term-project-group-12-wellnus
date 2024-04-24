<template>
  <form>
    <v-card title="Profile Information"></v-card>
    <br />
    <v-btn
      v-if="!state.editing"
      v-on:click="makeEdit"
      class="btn-right"
      id="btn"
      >Edit</v-btn
    >
    <v-btn v-else v-on:click="doneEdit" class="btn-right" id="btn">Done</v-btn>
    <br />
    <br />

    <v-card subtitle="Basic Information">
      <v-table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{{ state.name }} {{ state.surname }}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>{{ state.role }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ state.email }}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td v-if="!state.editing">{{ state.gender }}</td>
            <td v-else>
              <!-- <input type="text" v-model="state.gender" class="input-outline">  -->
              <v-select
                v-model="state.gender"
                :items="['Female', 'Male']"
                class="select-outline"
              ></v-select>
            </td>
          </tr>

          <tr>
            <td>Date of Birth</td>
            <td v-if="!state.editing">{{ state.dob }}</td>
            <td v-else>
              <input type="date" v-model="state.dob" class="input-outline" />
            </td>
          </tr>

          <tr>
            <td>Phone</td>
            <td v-if="!state.editing">{{ state.phone }}</td>
            <td v-else>
              <input type="text" v-model="state.phone" class="input-outline" />
            </td>
          </tr>
          <tr>
            <td>Nationality</td>
            <td v-if="!state.editing">{{ state.nationality }}</td>
            <td v-else>
              <input
                type="text"
                v-model="state.nationality"
                class="input-outline"
              />
            </td>
          </tr>
          <tr>
            <td>Country of Residence</td>
            <td v-if="!state.editing">{{ state.country }}</td>
            <td v-else>
              <input
                type="text"
                v-model="state.country"
                class="input-outline"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <br />
    <v-card v-if="state.role === 'Student'" subtitle="Medical Information">
      <v-table>
        <tbody>
          <tr>
            <td>Height</td>
            <td v-if="!state.editing">{{ state.height }}</td>
            <td v-else>
              <input type="text" v-model="state.height" class="input-outline" />
            </td>
          </tr>
          <tr>
            <td>Weight</td>
            <td v-if="!state.editing">{{ state.weight }}</td>
            <td v-else>
              <input type="text" v-model="state.weight" class="input-outline" />
            </td>
          </tr>
          <tr>
            <td>Drug Allergies</td>
            <td v-if="!state.editing">{{ state.drugAllergy }}</td>
            <td v-else>
              <input
                type="text"
                v-model="state.drugAllergy"
                class="input-outline"
              />
            </td>
          </tr>
          <tr>
            <td>Conditions</td>
            <td v-if="!state.editing">{{ state.medicalcon }}</td>
            <td v-else>
              <input
                type="text"
                v-model="state.medicalcon"
                class="input-outline"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-card v-else subtitle="Office Hours" style="align-items: left">
      <p style="text-align: left; padding-left: 30%">
        <strong>Mondays to Wednesdays : </strong>8.30am - 12.00pm, 1.30pm -
        5.30pm
      </p>
      <br />
      <p style="text-align: left; padding-left: 30%">
        <strong>Thursdays :</strong> 8.30am - 12.00pm, 1.30pm - 4.30pm
      </p>
      <br />
      <p style="text-align: left; padding-left: 30%">
        <strong>Fridays : </strong>8.30am - 12.00pm, 1.30pm - 5.00pm
      </p>
      <br />
      <p style="text-align: left; padding-left: 30%">
        <strong>Saturdays, Sundays & Public Holidays : </strong>Closed
      </p>

      <br />
    </v-card>
    <!-- add MC Table here:
      Row: each day, Col: Emails, action: add email (push into the array)
    -->
    <br />
    <v-card
      v-if="state.role === 'Student'"
      subtitle="Email List of Medical Certificate"
    >
      <v-table>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>
              <span v-for="(item, index) in state.Mon" :key="index">
                {{ item }}
                <span @click="() => deleteEmail('mon', index)" class="pl-2">
                  X</span
                >
                <br />
              </span>
            </td>
            <td
              v-if="!state.monAdd"
              v-on:click="
                () => {
                  addEmail('mon');
                }
              "
              class="add"
            >
              + Add
            </td>
            <td v-else>
              <input
                type="text"
                class="input-outline"
                v-model="state.emailToAdd"
              />
              <span
                v-on:click="
                  () => {
                    doneAddEmail('mon');
                  }
                "
                class="pl-2"
                >Done</span
              >
            </td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>
              <span v-for="(item, index) in state.Tue" :key="index">
                {{ item }}
                <span @click="() => deleteEmail('tue', index)" class="pl-2">
                  X</span
                >
                <br />
              </span>
            </td>
            <td
              v-if="!state.tueAdd"
              v-on:click="
                () => {
                  addEmail('tue');
                }
              "
              class="add"
            >
              + Add
            </td>
            <td v-else>
              <input
                type="text"
                class="input-outline"
                v-model="state.emailToAdd"
              />
              <span
                v-on:click="
                  () => {
                    doneAddEmail('tue');
                  }
                "
                class="pl-2"
                >Done</span
              >
            </td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>
              <span v-for="(item, index) in state.Wed" :key="index">
                {{ item }}
                <span @click="() => deleteEmail('wed', index)" class="pl-2">
                  X</span
                >
                <br
              /></span>
            </td>
            <td
              v-if="!state.wedAdd"
              v-on:click="
                () => {
                  addEmail('wed');
                }
              "
              class="add"
            >
              + Add
            </td>
            <td v-else>
              <input
                type="text"
                class="input-outline"
                v-model="state.emailToAdd"
              />
              <span
                v-on:click="
                  () => {
                    doneAddEmail('wed');
                  }
                "
                class="pl-2"
                >Done</span
              >
            </td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>
              <span v-for="(item, index) in state.Thu" :key="index">
                {{ item }}
                <span @click="() => deleteEmail('thu', index)" class="pl-2">
                  X</span
                >
                <br
              /></span>
            </td>
            <td
              v-if="!state.thuAdd"
              v-on:click="
                () => {
                  addEmail('thu');
                }
              "
              class="add"
            >
              + Add
            </td>
            <td v-else>
              <input
                type="text"
                class="input-outline"
                v-model="state.emailToAdd"
              />
              <span
                v-on:click="
                  () => {
                    doneAddEmail('thu');
                  }
                "
                class="pl-2"
                >Done</span
              >
            </td>
          </tr>

          <tr>
            <td>Friday</td>
            <td>
              <span v-for="(item, index) in state.Fri" :key="index">
                {{ item }}
                <span @click="() => deleteEmail('fri', index)" class="pl-2">
                  X</span
                >
                <br
              /></span>
            </td>
            <td
              v-if="!state.friAdd"
              v-on:click="
                () => {
                  addEmail('fri');
                }
              "
              class="add"
            >
              + Add
            </td>
            <td v-else>
              <input
                type="text"
                class="input-outline"
                v-model="state.emailToAdd"
              />
              <span
                v-on:click="
                  () => {
                    doneAddEmail('fri');
                  }
                "
                class="pl-2"
                >Done</span
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <br />
    <v-btn color="error" v-on:click="deleteAccount" class="btn-right"
      >Delete Account</v-btn
    >
  </form>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { getAuth } from "firebase/auth";
// add firebase to call to db
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
const router = useRouter();

// call to db goes here, then populate fields with existing values
const initialState = {
  name: "",
  surname: "",
  email: "",
  user: null,
  role: "",
  gender: "",
  dob: null,
  nationality: "",
  country: "",
  height: "",
  weight: "",
  drugAllergy: "",
  medicalcon: "",
  phone: "",
  editing: false,
  Mon: [],
  Tue: [],
  Wed: [],
  Thu: [],
  Fri: [],
  monAdd: false,
  tueAdd: false,
  wedAdd: false,
  thuAdd: false,
  friAdd: false,
  emailToAdd: "",
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  email: { required, email },
  contact: { required },
};

const v$ = useVuelidate(rules, state);

function makeEdit() {
  state.editing = !state.editing;
}

function addEmail(day) {
  state.emailToAdd = "";
  if (day === "mon") {
    state.monAdd = !state.monAdd;
    state.tueAdd = false;
    state.wedAdd = false;
    state.thuAdd = false;
    state.friAdd = false;
  } else if (day === "tue") {
    state.tueAdd = !state.tueAdd;
    state.monAdd = false;
    state.wedAdd = false;
    state.thuAdd = false;
    state.friAdd = false;
  } else if (day === "wed") {
    state.wedAdd = !state.wedAdd;
    state.tueAdd = false;
    state.monAdd = false;
    state.thuAdd = false;
    state.friAdd = false;
  } else if (day === "thu") {
    state.thuAdd = !state.thuAdd;
    state.tueAdd = false;
    state.wedAdd = false;
    state.monAdd = false;
    state.friAdd = false;
  } else if (day === "fri") {
    state.friAdd = !state.friAdd;
    state.tueAdd = false;
    state.wedAdd = false;
    state.thuAdd = false;
    state.monAdd = false;
  }
}

async function doneAddEmail(day) {
  const mcDoc = doc(db, "medicalcertificates", state.user.uid);

  const mcSnapshot = await getDoc(mcDoc);
  if (!mcSnapshot.exists()) {
    await setDoc(mcDoc, {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
    });
  }

  if (day === "mon") {
    if (state.emailToAdd.length > 0) {
      state.Mon.push(state.emailToAdd);
      await updateDoc(mcDoc, {
        Mon: state.Mon,
      });
      console.log("success");
    }
  } else if (day === "tue") {
    if (state.emailToAdd.length > 0) {
      state.Tue.push(state.emailToAdd);
      await updateDoc(mcDoc, {
        Tue: state.Tue,
      });
      console.log("success");
    }
  } else if (day === "wed") {
    if (state.emailToAdd.length > 0) {
      state.Wed.push(state.emailToAdd);
      await updateDoc(mcDoc, {
        Wed: state.Wed,
      });
      console.log("success");
    }
  } else if (day === "thu") {
    if (state.emailToAdd.length > 0) {
      state.Thu.push(state.emailToAdd);
      await updateDoc(mcDoc, {
        Thu: state.Thu,
      });
      console.log("success");
    }
  } else if (day === "fri") {
    if (state.emailToAdd.length > 0) {
      state.Fri.push(state.emailToAdd);
      await updateDoc(mcDoc, {
        Fri: state.Fri,
      });
      console.log("success");
    }
  }

  // all return to false
  state.thuAdd = false;
  state.tueAdd = false;
  state.wedAdd = false;
  state.monAdd = false;
  state.friAdd = false;
}

async function deleteEmail(day, index) {
  const mcDoc = doc(db, "medicalcertificates", state.user.uid);
  const mcSnapshot = await getDoc(mcDoc);
  if (day === "mon") {
    state.Mon.splice(index, 1);
    await updateDoc(mcDoc, {
      Mon: state.Mon,
    });
    console.log("success");
  } else if (day === "tue") {
    state.Tue.splice(index, 1);
    await updateDoc(mcDoc, {
      Tue: state.Tue,
    });
    console.log("success");
  } else if (day === "wed") {
    state.Wed.splice(index, 1);
    await updateDoc(mcDoc, {
      Wed: state.Wed,
    });
    console.log("success");
  } else if (day === "thu") {
    state.Thu.splice(index, 1);
    await updateDoc(mcDoc, {
      Thu: state.Thu,
    });
    console.log("success");
  } else if (day === "fri") {
    state.Fri.splice(index, 1);
    await updateDoc(mcDoc, {
      Fri: state.Fri,
    });
    console.log("success");
  }
}

async function doneEdit() {
  if (state.editing) {
    try {
      const userDoc = doc(db, "medical-info", state.user.uid);
      const userSnapshot = await getDoc(userDoc);
      console.log(userSnapshot.exists());

      if (!userSnapshot.exists()) {
        await setDoc(userDoc, {
          phone: state.phone,
          dob: state.dob,
          country: state.country,
          drugAllergy: state.drugAllergy,
          gender: state.gender,
          height: state.height,
          medicalCon: state.medicalcon,
          nationality: state.nationality,
          weight: state.weight,
        });
      }

      const date = new Date();
      const inputDate = new Date(state.dob);
      if (inputDate < date) {
        await updateDoc(userDoc, {
          phone: state.phone,
          dob: state.dob,
          country: state.country,
          drugAllergy: state.drugAllergy,
          gender: state.gender,
          height: state.height,
          medicalCon: state.medicalcon,
          nationality: state.nationality,
          weight: state.weight,
        });

        state.editing = false;
        alert("Information Updated Successfully!");
      } else {
        alert("DOB cannot be later than the current date");
      }
    } catch (error) {
      console.error("Error updating phone:", error);
    }
  }
}

onMounted(async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  state.user = user;

  if (state.user) {
    // information from the users tables
    const userDoc = doc(db, "users", state.user.uid);
    const querySnapshot = await getDoc(userDoc);
    console.log(querySnapshot);
    if (querySnapshot.exists()) {
      const userData = querySnapshot.data();
      state.name = userData.firstName;
      state.surname = userData.lastName;
      state.email = userData.email;
      const role = userData.isDoctor;
      if (role) {
        state.role = "Doctor";
      } else {
        state.role = "Student";
      }
    }

    // information from the medical info table
    const medDoc = doc(db, "medical-info", state.user.uid);
    const medSnapshot = await getDoc(medDoc);
    if (medSnapshot.exists()) {
      const medData = medSnapshot.data();
      console.log(medData);
      state.country = medData.country;
      state.dob = medData.dob;
      state.drugAllergy = medData.drugAllergy;
      state.gender = medData.gender;
      state.height = medData.height;
      state.medicalcon = medData.medicalCon;
      state.nationality = medData.nationality;
      state.weight = medData.weight;
      state.phone = medData.phone;
    }

    // get MC Emails
    const mcDoc = doc(db, "medicalcertificates", state.user.uid);
    const mcSnapshot = await getDoc(mcDoc);
    console.log(mcSnapshot.data());
    if (mcSnapshot.exists()) {
      const mcData = mcSnapshot.data();
      state.Mon = mcData.Mon;
      state.Tue = mcData.Tue;
      state.Wed = mcData.Wed;
      state.Thu = mcData.Thu;
      state.Fri = mcData.Fri;
      // console.log(mcData.Mon)
    }
  }
});

/*function clear() {
    v$.value.$reset();

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value;
    }
  }*/
async function deleteAccount() {
  if (
    confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
  ) {
    try {
      // Mark the user as inactive in the database
      const userDocRef = doc(db, "users", state.user.uid);
      await updateDoc(userDocRef, {
        isActive: false,
      });

      // Log out the user
      const auth = getAuth();
      await auth.signOut();

      // Redirect to login page
      router.push({ name: "Login" });
      alert("Account deleted successfully.");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  }
}
</script>

<style>
th,
td {
  padding: 8px;
  text-align: left; /* Align text to the left within each cell */
  border-bottom: 1px solid #ddd;
}
th {
  background-color: #f2f2f2;
}

td:first-child {
  width: 45%; /* Adjust the width as needed */
}
.input-outline {
  border: 1px solid #ccc; /* Set the border style, color, and width */
  padding: 4px; /* Add padding for better appearance */
  border-radius: 4px; /* Optionally, add border radius for rounded corners */
}

.select-outline {
  border: 1px solid #ccc; /* Set the border style, color, and width */
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 4px; /* Optionally, add border radius for rounded corners */
  width: 40%;
  height: 70%;
}

.btn-right {
  float: right;
}

.add {
  text-align: right;
}

.add:hover {
  cursor: pointer;
  color: rgb(68, 127, 204);
}
span:hover {
  cursor: pointer;
}
</style>
