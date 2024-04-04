<script>
export default {
  name: "UserAvatar",
  props: { user: Object, userPhoto: String },

  data() {
    return {};
  },
};
</script>

<template>
  <v-avatar
    ><v-img
      v-if="user?.photoURL"
      :src="userPhoto"
      referrerpolicy="no-referrer"
    ></v-img
    ><v-icon v-else>$account</v-icon></v-avatar
  >
</template>
