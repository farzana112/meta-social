// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import configKeys from "../../config";
import { getAuth, GoogleAuthProvider} from "firebase/auth"

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: configKeys.apiKey,
//   authDomain: configKeys.authDomain,
//   projectId: configKeys.projectId,
//   storageBucket: configKeys.storageBucket,
//   messagingSenderId: configKeys.messagingSenderId,
//   appId: configKeys.appId,
//   measurementId: configKeys.measurementId
// };
const firebaseConfig = {
  apiKey: "AIzaSyDB65lNn93wOv8_VK8e-Tr0-HcEKOOu60E",
  authDomain: "pure-zoo-394710.firebaseapp.com",
  projectId: "pure-zoo-394710",
  storageBucket: "pure-zoo-394710.appspot.com",
  messagingSenderId: "632845274063",
  appId: "1:632845274063:web:a9f110c8428ac063b620ba",
  measurementId: "G-HYERS1XCRW"
};
console.log(firebaseConfig.apiKey)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth,provider}