import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgOSQsv_MRdaqrW4wJw0q2QY6wXZ-azQs",
  authDomain: "guidelogin-b0053.firebaseapp.com",
  projectId: "guidelogin-b0053",
  storageBucket: "guidelogin-b0053.firebasestorage.app",
  messagingSenderId: "981519805247",
  appId: "1:981519805247:web:cc32682b177a4957c0818a",
  measurementId: "G-2VR4TS6JND"
};

export const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase);

onAuthStateChanged(auth, user => {
    if (!user) window.location.href = "admin-login.html";
});
