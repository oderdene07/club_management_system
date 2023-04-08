import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXHg-H54vE3wpTuP90nDBsYGv8LH2kAGE",
  authDomain: "club-management-system-d474b.firebaseapp.com",
  projectId: "club-management-system-d474b",
  storageBucket: "club-management-system-d474b.appspot.com",
  messagingSenderId: "336669191655",
  appId: "1:336669191655:web:bba1a88e727314e5e1e142",
  measurementId: "G-35KFRTWWFP",
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
