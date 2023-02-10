import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWxDHxvaHGtIrRiLDxeo3WLx7HdYuE1c8",
  authDomain: "hope-b99cf.firebaseapp.com",
  projectId: "hope-b99cf",
  storageBucket: "hope-b99cf.appspot.com",
  messagingSenderId: "789887367839",
  appId: "1:789887367839:web:293b11bce8a9c011d4c0aa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
