<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    name: "NavBar",

    data() {
        return {
            user: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        });
    }
}
</script>

<template>
    <div id="logged" v-if="user">
        <div id="nav">
            <router-link to="appointments"> Appointments </router-link> |
            <router-link to="form"> Form </router-link>
        </div>
    </div>
</template>

<style>
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
