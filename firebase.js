// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEJMObXjLtxZWWiykBtSKYW3kVEJ_H2ms",
  authDomain: "inventory-562c3.firebaseapp.com",
  projectId: "inventory-562c3",
  storageBucket: "inventory-562c3.appspot.com",
  messagingSenderId: "593785619889",
  appId: "1:593785619889:web:25fbea4ac1d78193bee990",
  measurementId: "G-X5XBE5SPE1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };
