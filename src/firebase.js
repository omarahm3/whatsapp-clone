import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBEaH_imZDFS7uPdRarFiNndeZ98pB7JDM",
  authDomain: "whatsapp-clone-7225d.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-7225d.firebaseio.com",
  projectId: "whatsapp-clone-7225d",
  storageBucket: "whatsapp-clone-7225d.appspot.com",
  messagingSenderId: "70135866834",
  appId: "1:70135866834:web:d3b840d47c5f3327f6140b",
  measurementId: "G-RMMSQX1H6S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;