import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXHg-H54vE3wpTuP90nDBsYGv8LH2kAGE",
  authDomain: "club-management-system-d474b.firebaseapp.com",
  projectId: "club-management-system-d474b",
  storageBucket: "club-management-system-d474b.appspot.com",
  messagingSenderId: "336669191655",
  appId: "1:336669191655:web:bba1a88e727314e5e1e142",
  measurementId: "G-35KFRTWWFP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
