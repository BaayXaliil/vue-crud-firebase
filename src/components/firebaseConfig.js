import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyApTdV4GZ3tsNgFwqwbRkC-IbI0g1srTVU",
  authDomain: "apprendre-vuejs.firebaseapp.com",
  projectId: "apprendre-vuejs",
  storageBucket: "apprendre-vuejs.appspot.com",
  messagingSenderId: "331911613154",
  appId: "1:331911613154:web:ff3edffc4744c5bd7facbb",
  measurementId: "G-743HZPYK33"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()
