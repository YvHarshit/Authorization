import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth" 

const firebaseConfig = {
//   apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY,
//   authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: (import.meta as any).env.VITE_FIREBASE_APP_ID,

  apiKey: "AIzaSyARPNJzaNc4skv-Kx86ObsprR3kxQCzfcE",
  authDomain: "auth-project-2209.firebaseapp.com",
  projectId: "auth-project-2209",
  storageBucket: "auth-project-2209.firebasestorage.app",
  messagingSenderId: "617959235808",
  appId: "1:617959235808:web:68d1975192248a00957085"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
