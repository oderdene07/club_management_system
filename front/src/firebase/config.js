import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXHg-H54vE3wpTuP90nDBsYGv8LH2kAGE",
  authDomain: "club-management-system-d474b.firebaseapp.com",
  projectId: "club-management-system-d474b",
  storageBucket: "club-management-system-d474b.appspot.com",
  messagingSenderId: "336669191655",
  appId: "1:336669191655:web:fb3d0e1497704736e1e142",
  measurementId: "G-GBE33NWRJD",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
