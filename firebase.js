// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "inventory-562c3.firebaseapp.com",
  projectId: "inventory-562c3",
  storageBucket: "inventory-562c3.appspot.com",
  messagingSenderId: "593785619889",
  appId: "1:593785619889:web:25fbea4ac1d78193bee990",
  measurementId: "G-X5XBE5SPE1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };