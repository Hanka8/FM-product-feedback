// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh5AHW4nW0K15GQYLARyljgbNN7RVp99w",
  authDomain: "product-feedback-51fef.firebaseapp.com",
  projectId: "product-feedback-51fef",
  storageBucket: "product-feedback-51fef.appspot.com",
  messagingSenderId: "806612704431",
  appId: "1:806612704431:web:d86d5b7d4c3566f30f885a",
  measurementId: "G-GG15E2R3K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);