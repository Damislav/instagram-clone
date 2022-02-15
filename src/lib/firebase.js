import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBrkBCBCHBhQNjxTfoVRYMMjIg03OBaKXg",
  authDomain: "instagram-clone-966b1.firebaseapp.com",
  projectId: "instagram-clone-966b1",
  storageBucket: "instagram-clone-966b1.appspot.com",
  messagingSenderId: "32614697689",
  appId: "1:32614697689:web:4001d854c5350e191c4cc8",
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
