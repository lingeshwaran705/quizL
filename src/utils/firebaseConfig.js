import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEUmqF67rC8mh4JM891mz0g6WBqPWxn7k",
  authDomain: "quizl-ef4e3.firebaseapp.com",
  projectId: "quizl-ef4e3",
  storageBucket: "quizl-ef4e3.appspot.com",
  messagingSenderId: "204949373215",
  appId: "1:204949373215:web:453951cd089cc72ffe702a",
  measurementId: "G-5H76PVXL97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
