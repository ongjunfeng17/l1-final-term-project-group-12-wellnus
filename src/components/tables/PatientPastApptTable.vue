<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <h1 id="table-header">Past Appointments</h1>
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
      :items-per-page-options="[1, 3, 5, 10, 20, -1]"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" @click="viewAppt(item.id)" color="black">
          $document
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import firebaseApp from "../../firebase.js";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import router from "../../router/index.js";
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
      {
        title: "MC",
        key: "mc",
        sortable: false,
        align: "center",
        width: "10%",
      },
      {
        title: "View",
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
        where("timestamp", "<", Date.now())
      );
      const querySnapshot = await getDocs(q);

      let counter = 1;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const docData = doc.data();
        const mcDays = docData["daysMC"];
        const mc = mcDays ? mcDays + " days" : "NIL";
        const docObj = {
          id: doc.id,
          sn: counter,
          date: docData["date"],
          time: docData["time"],
          teleconsult: docData["teleconsult"],
          mc: mc,
        };
        this.data.push(docObj);
        counter++;
      });
    },
    async viewAppt(id) {
      router.push({ path: "/view-appt", query: { appointmentId: id } });
    },
  },
};
</script>
