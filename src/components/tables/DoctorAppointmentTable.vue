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
      { title: "Date (DD/MM/YY)", key: "date", align: "center" },
      { title: "Time", key: "time", align: "center" },
      { title: "Patient", key: "email", align: "center" },
      { title: "Teleconsult", key: "teleconsult", align: "center" },
      { title: "Actions", key: "actions", sortable: false, align: "center" },
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
