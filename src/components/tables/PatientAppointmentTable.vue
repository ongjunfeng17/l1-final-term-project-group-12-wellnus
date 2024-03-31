<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :sort-by="[{ key: 'date', order: 'asc' }]"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" @click="deleteItem(item)" color="black">
        $delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import firebaseApp from "../../firebase.js";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, doc } from "firebase/firestore";
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
    data: [{
          sn: 1,
          date: "13/05/24",
          time: "17:30",
          teleconsult: "NIL",
          MC: "NIL",
        }],
  }),

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const querySnapshot = await getDocs(collection(db, "davidyeong555@gmail.com"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      this.data = [
        {
          sn: 1,
          date: "13/05/24",
          time: "17:30",
          teleconsult: "NIL",
          MC: "NIL",
        
        },
      ];
    },
    deleteItem(item) {},
  },
};
</script>
