import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkdVSOYvq5xxMmt-SRuJihpB0Tf1wWUL0",
  authDomain: "solar-f0376.firebaseapp.com",
  projectId: "solar-f0376",
  storageBucket: "solar-f0376.appspot.com",
  messagingSenderId: "982705083707",
  appId: "1:982705083707:web:b3475d4bb6993accf3931e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)