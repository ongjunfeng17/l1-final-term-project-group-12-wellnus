<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :sort-by="[{ key: 'date', order: 'asc' }]"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" @click="attendTo(item.id)" color="black">
        $delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import firebaseApp from "../../firebase.js";
import { getDocs, getFirestore, collection, query, where } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: "S/N", key: "sn",  align: "center" },
      { title: "Patient Email", key: "email", align: "center" },
      { title: "Date (YYYY/MM/DD)", key: "date", align: "center" },
      { title: "Time", key: "time", align: "center" },
      { title: "Teleconsult", key: "teleconsult", align: "center" },
      { title: "MC", key: "mc", align: "center" },
      { title: "Actions", key: "actions", sortable: false, align: "center" }
    ],
    data: [],
  }),

  props: {
    user: {
      type: Object
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const todayString = new Date().toLocaleDateString("sv");
      const q = query(collection(db, "appointments"), 
          where("date", "==", todayString));
      const querySnapshot = await getDocs(q);
      
      let counter = 1;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const docData = doc.data();
        console.log(doc.id);
        const docObj = {
          
          /* Added a new field doc.id (appointment id) 
           * because we need to delete specific appointments
           */
          id: doc.id,
          sn: counter,
          email: docData["email"],
          date: docData["date"],
          time: docData["time"],
          teleconsult: docData["teleconsult"],
          mc: docData["needMC"]
        }
        this.data.push(docObj);
        counter++;
      });
    },
    async attendTo(id) { 
        // using appointment id to delete appointment
        alert("You are going to attend to user " + id);
    },
  },
};
</script>

