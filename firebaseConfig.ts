// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqX4fuQmpuTC9ynIaIYqQnN4-DwUc6ZK0",
  authDomain: "windy-lyceum-403111.firebaseapp.com",
  databaseURL: "https://windy-lyceum-403111-default-rtdb.firebaseio.com",
  projectId: "windy-lyceum-403111",
  storageBucket: "windy-lyceum-403111.appspot.com",
  messagingSenderId: "341913872962",
  appId: "1:341913872962:web:0db914ba6953c79c9b5bdb",
  measurementId: "G-BJVF8PGNL2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
