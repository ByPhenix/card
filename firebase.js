// À compléter avec tes infos Firebase
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "XXX",
  appId: "XXX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
