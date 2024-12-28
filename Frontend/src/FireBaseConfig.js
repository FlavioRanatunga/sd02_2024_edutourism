// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXB9E-EsUMHjgN55IxulPS3g1rvsmHOKI",
  authDomain: "eduexplore-4ac4e.firebaseapp.com",
  projectId: "eduexplore-4ac4e",
  storageBucket: "eduexplore-4ac4e.appspot.com",
  messagingSenderId: "795588118216",
  appId: "1:795588118216:web:ad5466a9a44448945c47fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)