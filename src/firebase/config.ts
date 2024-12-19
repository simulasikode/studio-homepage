// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOP3UhZ2B-7naisuTn1JDfqHGbZ8HmzM8",
  authDomain: "studiosimulasi.firebaseapp.com",
  projectId: "studiosimulasi",
  storageBucket: "studiosimulasi.appspot.com",
  messagingSenderId: "228696722817",
  appId: "1:228696722817:web:72d572a227fd49fb40ec80",
  measurementId: "G-2EQYKBXGNE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
