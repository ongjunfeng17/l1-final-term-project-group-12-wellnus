<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :sort-by="[{ key: 'date', order: 'asc' }]"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" @click="deleteItem(item.date)" color="black">
        $delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import firebaseApp from "../../firebase.js";
import { getDocs, getFirestore, deleteDoc } from "firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: "S/N", key: "sn",  align: "center" },
      { title: "Date (DD/MM/YY)", key: "date", align: "center" },
      { title: "Time", key: "time", align: "center" },
      { title: "Teleconsult", key: "teleconsult", align: "center" },
      { title: "Actions", key: "actions", sortable: false, align: "center" }
    ],
    data: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const auth = getAuth();
      const userEmail = auth.currentUser["email"];
      const querySnapshot = await getDocs(collection(db, userEmail));
      const timeNow = Date.now();
      let counter = 1;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const docData = doc.data();
        const docObj = {
          sn: counter,
          date: docData["Date"],
          time: docData["Time"],
          teleconsult: docData["Teleconsult"]
        }
        const docTimeString = `${docObj.date}T${docObj.time}`;
        const docTime = new Date(docTimeString).valueOf();
        if (docTime >= timeNow) {
          this.data.push(docObj);
          counter++;
        }
      });
    },
    async deleteItem(date) { 
      // item = document name or date of appointment
      const auth = getAuth();
      const userEmail = auth.currentUser["email"];
      alert("You are going to cancel an appointment");
      await deleteDoc(doc(db, userEmail, date));
      this.data = this.data.filter((dataItem) => dataItem.date !== date);
      alert("Your appointment has been cancelled successfully");
      
    },
  },
};
</script>
