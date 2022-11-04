import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const PROJECT_ID = "drinking-buddy-211cf";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBMCq3Wiik3ShUP1zhzoL7sVb0fxP_7rGM",
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: "1070287926369",
  appId: "1:1070287926369:web:24f37610ed4afea3b8a620",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export default getFirestore(app);
