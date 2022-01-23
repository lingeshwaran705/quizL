import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5l52RfYnVGvnDJxOUycb5RVCbkzMrj1g",
  authDomain: "quizl-ccf21.firebaseapp.com",
  databaseURL:
    "https://quizl-ccf21-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quizl-ccf21",
  storageBucket: "quizl-ccf21.appspot.com",
  messagingSenderId: "1065969533318",
  appId: "1:1065969533318:web:adc1cae976c6f9a7e4ac07",
  measurementId: "G-X274RZPCEZ",
};

export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
