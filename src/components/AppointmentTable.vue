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
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "S/N",
        align: "start",
        key: "sn",
      },
      { title: "Date (DD/MM/YY)", key: "date" },
      { title: "Time", key: "time" },
      { title: "Patient", key: "email" },
      { title: "Teleconsult", key: "teleconsult" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    data: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.data = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          sn: 1,
          date: "13/05/24",
          time: "17:30",
          email: "e1234567@u.nus.edu",
          teleconsult: "NIL",
          MC: "NIL",
        },
      ];
    },
    deleteItem(item) {},
  },
};
</script>
