<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :sort-by="[{ key: 'date', order: 'asc' }]"
  >
  </v-data-table>
</template>

<script>
import firebaseApp from "../../firebase.js";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
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
      { title: "Medical Certificate", key: "mc", sortable: false, align: "center" }
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
      const uid = this.user.uid;
      const q = query(collection(db, "appointments"), 
          where("patientId", "==", uid),
          where("timestamp", "<", Date.now()));
      const querySnapshot = await getDocs(q);
      
      let counter = 1;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const docData = doc.data();
        const docObj = {
          sn: counter,
          date: docData["date"],
          time: docData["time"],
          teleconsult: docData["teleconsult"],
          mc: "NIL"
        }
        this.data.push(docObj);
        counter++;
      });
    },
  },
};
</script>
