<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <h1 id="table-header">Today's Active Appointments</h1>
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
      :items-per-page="3"
      :items-per-page-options="[1, 3, 5, 10, 20, -1]"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" @click="attendTo(item.id)" color="black">
          $clipboard
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
  collection,
  query,
  where,
} from "firebase/firestore";
import router from "../../router/index.js";
const db = getFirestore(firebaseApp);

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { title: "S/N", key: "sn", align: "center", width: "10%" },
      { title: "Patient Email", key: "email", align: "center", width: "20%" },
      {
        title: "Date (YYYY/MM/DD)",
        key: "date",
        align: "center",
        width: "15%",
      },
      { title: "Time", key: "time", align: "center", width: "15%" },
      {
        title: "Teleconsult",
        key: "teleconsult",
        align: "center",
        width: "15%",
      },
      { title: "MC", key: "mc", align: "center", width: "15%" },
      {
        title: "Diagnose",
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
      const todayString = new Date().toLocaleDateString("sv");
      const q = query(
        collection(db, "appointments"),
        where("date", "==", todayString),
        where("doctorId", "==", "") // empty doctorId means doctor has not seen patient
      );
      const querySnapshot = await getDocs(q);

      let counter = 1;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const docData = doc.data();
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
          mc: docData["needMC"],
        };
        this.data.push(docObj);
        counter++;
      });
    },
    attendTo(id) {
      //alert("You are going to attend to user " + id);
      console.log(id);
      router.push({ path: "/diagnosis", query: { appointmentId: id } });
    },
  },
};
</script>
