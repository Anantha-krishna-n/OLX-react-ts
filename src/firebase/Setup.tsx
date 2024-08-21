import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3s7G46LcNL5m6-zktzCb1po7sKE0626Q",
  authDomain: "olx-react-ts.firebaseapp.com",
  projectId: "olx-react-ts",
  storageBucket: "olx-react-ts.appspot.com",
  messagingSenderId: "753663603358",
  appId: "1:753663603358:web:bfe36dea9f6e4c102d018f"
};

export const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()
export const firestore = getFirestore(app);
export const storage = getStorage(app);