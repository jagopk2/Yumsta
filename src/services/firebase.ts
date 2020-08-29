import firebase from "firebase";

var config = {
  apiKey: "AIzaSyAFaGRqTOeatcflsq9OKG1OE_RgKH5aN0w",
  authDomain: "yumsta-6e3a4.firebaseapp.com",
  databaseURL: "https://yumsta-6e3a4.firebaseio.com",
  projectId: "yumsta-6e3a4",
  storageBucket: "yumsta-6e3a4.appspot.com",
  messagingSenderId: "219613367313",
  appId: "1:219613367313:web:193e8263b15a25467db5b0",
  measurementId: "G-BV50VL206Y",
};
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export const firestore = firebase.firestore();
export const auth = firebase.auth;
export const db = firebase.database();
