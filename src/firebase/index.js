// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeqWKaBrIEu1olDdiYuCOj-iofmpcLVW4",
  authDomain: "zsechat.firebaseapp.com",
  projectId: "zsechat",
  storageBucket: "zsechat.appspot.com",
  messagingSenderId: "13897562575",
  appId: "1:13897562575:web:a7325a162b0d9d65b0baba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}

