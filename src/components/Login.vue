<template>
    <div style="text-align:center;">
        <h1 id="mainHead">WellNUS</h1>
        <div id="pagecontent">
            WellNUS is an app to book and track your appointments at UHC. <br>
            Simply book an appointment and enjoy less waiting time when you head over for your appointment. <br>
            This app also allows for the option to teleconsult your doctors at the comfort of your home.
        </div>
        
        <div id="firebaseui-auth-container"></div>
        <h5>copyright@wellnus-2024</h5>
    </div>
</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
    name: "Login",

    mounted() {
        //Calling the ui instance
        var ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            //we need to create the instance only one time
            //initialise the firebaseui widget using firebase.
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        var uiConfig = {
            signInSuccessURL: '/appointments',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ]
        };

        ui.start("#firebaseui-auth-container", uiConfig)
    },

    data: () => ({
        step: 1,
    }),
    props: {
        source: String,
    },
};
</script>

<style scoped>
#firebaseui-auth-container {
    border: 2px solid #000;
    /* Black border, 2px thick */
    display: inline-block;
    padding: 20px;
    margin-top: 25px;
    margin-bottom: 25px;
}

#pagecontent {
    height: auto; /* Adjusted to auto to accommodate varying content heights */
    font-size: larger;
    font-weight: bolder;
    text-align: center;
    border: 2px solid #000; /* Add a black border, 2px thick */
    padding: 20px; /* Add padding around the text for better readability */
    margin: 25px 0;
}

#mainHead {
    text-align: center;
    /* font-size: 50px;
    height: 100px; */
    text-shadow: 2px 2px grey;
}

#bg {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
}

h5 {
    text-align: center;
    background-color: rgb(68, 127, 204);
}
</style>