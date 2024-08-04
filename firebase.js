// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB91dF2gKGi1vzGWhHoMExHOZayGBQ4_6c",
  authDomain: "inventory-management-app-ee159.firebaseapp.com",
  projectId: "inventory-management-app-ee159",
  storageBucket: "inventory-management-app-ee159.appspot.com",
  messagingSenderId: "522851046096",
  appId: "1:522851046096:web:640c2d7f7b308e396244d5",
  measurementId: "G-WZRW9MK5JP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };