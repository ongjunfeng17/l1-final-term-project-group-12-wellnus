<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <h1 id="table-header">Upcoming Appointments</h1>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="$magnify"
        variant="solo-filled"
        hide-details
        single-line
        flat
      ></v-text-field>
    </v-card-title>
    <v-divider class="border-opacity-100 mb-4"></v-divider>
    <v-data-table
      :headers="headers"
      :items="data"
      :sort-by="[{ key: 'date', order: 'asc' }]"
      :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" @click="deleteItem(item.id)" color="black">
          $delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import firebaseApp from "../../firebase.js";
import {
  getDocs,
  getFirestore,
  deleteDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { doc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { title: "S/N", key: "sn", align: "center", width: "10%" },
      {
        title: "Date (YYYY/MM/DD)",
        key: "date",
        align: "center",
        width: "20%",
      },
      { title: "Time", key: "time", align: "center", width: "20%" },
      {
        title: "Teleconsult",
        key: "teleconsult",
        align: "center",
        width: "20%",
      },
      { title: "MC", key: "mc", align: "center", width: "20%" },
      {
        title: "Actions",
        key: "actions",
        sortable: false,
        align: "center",
        width: "10%",
      },
    ],
    data: [],
  }),

  props: {
    user: {
      type: Object,
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const uid = this.user.uid;
      const q = query(
        collection(db, "appointments"),
        where("patientId", "==", uid),
        where("timestamp", ">=", Date.now())
      );
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
          date: docData["date"],
          time: docData["time"],
          teleconsult: docData["teleconsult"],
          mc: docData["needMC"],
        };
        this.data.push(docObj);
        counter++;
      });
    },
    async deleteItem(id) {
      // using appointment id to delete appointment
      alert("You are going to cancel an appointment");
      await deleteDoc(doc(db, "appointments", id));
      this.data = this.data.filter((dataItem) => dataItem.id !== id);
      alert("Your appointment has been cancelled successfully");
    },
  },
};
</script>
