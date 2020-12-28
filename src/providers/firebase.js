import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA24BvcipRUlAkrKubaRcrjphoR-xkTaH8",
  authDomain: "legacy-freight-s-1549482386765.firebaseapp.com",
  databaseURL: "https://legacy-freight-s-1549482386765.firebaseio.com",
  projectId: "legacy-freight-s-1549482386765",
  storageBucket: "legacy-freight-s-1549482386765.appspot.com",
  messagingSenderId: "654902185690",
  appId: "1:654902185690:web:94c004b223f96d9b25dfe3"
};

firebase.initializeApp(firebaseConfig);
export default firebase;