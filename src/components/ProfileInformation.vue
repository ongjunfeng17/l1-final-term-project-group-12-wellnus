<template>
  <form>
    <v-card title="Profile Information"></v-card>
    <br/>
    <v-btn v-if="!state.editing" v-on:click="makeEdit" class="btn-right">Edit</v-btn>
    <v-btn v-else v-on:click="doneEdit" class="btn-right">Done</v-btn>
    <br/>
    <br/>

    <v-card subtitle="Basic Information">
      <v-table>
        
        <tbody>
          <tr>
            <td> Name </td>
            <td>{{ state.name }} {{ state.surname }}</td>
            
          </tr>
          <tr>
            <td> Role </td>
            <td>{{ state.role }}</td>
            
          </tr>
          <tr>
            <td> Email </td>
            <td>{{ state.email }}</td>
           
          </tr>
          <tr>
            <td> Gender </td>
            <td v-if="!state.editing">{{ state.gender }}</td>
            <td v-else> <input type="text" v-model="state.gender" class="input-outline"> </td>   
          </tr>

          <tr>
            <td> Date of Birth</td>
            <td v-if="!state.editing">{{ state.dob }}</td>
            <td v-else> <input type="date" v-model="state.dob" class="input-outline"></td>
          </tr>

          <tr>
            <td > Phone </td>
            <td v-if="!state.editing">{{ state.phone }}</td>
            <td v-else> <input type="text" v-model="state.phone" class="input-outline"> </td>
          </tr>
          <tr>
            <td> Nationality </td>
            <td v-if="!state.editing">{{ state.nationality }}</td>
            <td v-else> <input type="text" v-model="state.nationality" class="input-outline"> </td>
   
          </tr>
          <tr>
            <td> Country of Residence </td>
            <td v-if="!state.editing">{{ state.country }}</td>
            <td v-else> <input type="text" v-model="state.country" class="input-outline"> </td>
        
          </tr>
        </tbody>
      
    
      </v-table>
    </v-card>
    <br/>
    <v-card subtitle="Medical Information">
      <v-table>
        
        <tbody>
          <tr>
            <td> Height </td>
            <td v-if="!state.editing">{{ state.height }}</td>
            <td v-else> <input type="text" v-model="state.height" class="input-outline"> </td>
            
          </tr>
          <tr>
            <td> Weight </td>
            <td v-if="!state.editing">{{ state.weight }}</td>
            <td v-else> <input type="text" v-model="state.weight" class="input-outline"> </td>
            
          </tr>
          <tr>
            <td> Drug Allergies </td>
            <td v-if="!state.editing">{{ state.drugAllergy }}</td>
            <td v-else> <input type="text" v-model="state.drugAllergy" class="input-outline"> </td>
            
         
          </tr>
          <tr>
            <td> Conditions </td>
            <td v-if="!state.editing">{{ state.medicalcon }}</td>
            <td v-else> <input type="text" v-model="state.medicalcon" class="input-outline"> </td>
            
            

          </tr>
        </tbody>
      
    
      </v-table>
    </v-card>
  </form>
</template>
<script setup>
  import { reactive, onMounted } from "vue";
  import { useVuelidate } from "@vuelidate/core";
  import { email, required } from "@vuelidate/validators";
  import { getAuth} from "firebase/auth";
  // add firebase to call to db
  import firebaseApp from '../firebase.js';
  import { getFirestore } from 'firebase/firestore';
  import { getDoc, doc, updateDoc, setDoc} from 'firebase/firestore';
  const db = getFirestore(firebaseApp)


  // call to db goes here, then populate fields with existing values
  const initialState = {
    name: "",
    surname: "",
    email: "",
    user: null,
    role: "",
    gender: "",
    dob : null,
    nationality : "",
    country : "",
    height: "",
    weight: "",
    drugAllergy: "",
    medicalcon: "",
    phone: "",
    editing: false

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

  async function doneEdit() {
    if (state.editing) {
      try {
      const userDoc = doc(db, "medical-info", state.user.uid); 
      const userSnapshot = await getDoc(userDoc)
      console.log(userSnapshot.exists());

      if (!userSnapshot.exists()) {
        await setDoc(userDoc, {
          phone : state.phone,
          dob : state.dob,
          country : state.country,
          drugAllergy : state.drugAllergy,
          gender : state.gender,
          height : state.height,
          medicalCon : state.medicalcon,
          nationality : state.nationality,
          weight : state.weight 

        })
      }

      const date = new Date();
      const inputDate = new Date(state.dob);
      if (inputDate < date) {
        await updateDoc(userDoc, {
        phone : state.phone,
        dob : state.dob,
        country : state.country,
        drugAllergy : state.drugAllergy,
        gender : state.gender,
        height : state.height,
        medicalCon : state.medicalcon,
        nationality : state.nationality,
        weight : state.weight 
        });
      
      state.editing = false;
      alert("Information Updated Successfully!")

      } else {
        alert("DOB cannot be later than the current date")
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
          state.role = "Doctor"
        } else {
          state.role = "Student"
        }
      }

      // information from the medical info table
      const medDoc = doc(db, "medical-info", state.user.uid);
      const medSnapshot = await getDoc(medDoc);
      if (medSnapshot.exists()) {
        const medData = medSnapshot.data();
        console.log(medData)
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
    }

    
  });


  /*function clear() {
    v$.value.$reset();

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value;
    }
  }*/
</script>

<style>
th, td {
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
  padding: 4px 8px; /* Add padding for better appearance */
  border-radius: 4px; /* Optionally, add border radius for rounded corners */
}

.btn-right {
  float: right;
}
</style>