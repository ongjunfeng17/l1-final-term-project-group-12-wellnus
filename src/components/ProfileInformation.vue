<template>
  <form>
    <v-text-field
      v-model="state.name"
      :counter="10"
      :error-messages="v$.name.$errors.map((e) => e.$message)"
      label="Display Name"
      required
      @blur="v$.name.$touch"
      @input="v$.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map((e) => e.$message)"
      label="E-mail address"
      required
      @blur="v$.email.$touch"
      @input="v$.email.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.contact"
      :error-messages="v$.contact.$errors.map((e) => e.$message)"
      label="Phone Number"
      required
      @blur="v$.contact.$touch"
      @input="v$.contact.$touch"
    ></v-text-field>

    <v-btn class="me-4" @click="v$.$validate"> submit </v-btn>
    <!-- this button should trigger form submission and
    ideally send a confirmation message on success  -->
  </form>
</template>
<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

// call to db goes here, then populate fields with existing values
const initialState = {
  name: "",
  email: "",
  contact: "",
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  email: { required, email },
  contact: { required },
};

const v$ = useVuelidate(rules, state);

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>
