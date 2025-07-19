// Import des fonctions Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2-dqkks90qCb8b3k0UKCoRbVt7ykr5_Yw",
  authDomain: "card-78b75.firebaseapp.com",
  projectId: "card-78b75",
  storageBucket: "card-78b75.appspot.com",
  messagingSenderId: "771776470223",
  appId: "1:771776470223:web:4aa180f8e64a7b8f0e2bba"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exporter la base de données pour l'utiliser ailleurs
export { db };
