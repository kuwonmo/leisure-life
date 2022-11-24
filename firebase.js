import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyCrP_GRqeK-luKjbPTY1a2YcUzIM-jHOB4",
    authDomain: "gifted-chat-340b1.firebaseapp.com",
    projectId: "gifted-chat-340b1",
    storageBucket: "gifted-chat-340b1.appspot.com",
    messagingSenderId: "842185058629",
    appId: "1:842185058629:web:215e85f595e8ce802bb62c",
};
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
