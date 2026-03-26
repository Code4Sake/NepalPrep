import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAQ-Ju6mvaDn8C6HTfy04sZAv7SI27Afgs",
  authDomain: "nepalprep-1.firebaseapp.com",
  projectId: "nepalprep-1",
  storageBucket: "nepalprep-1.firebasestorage.app",
  messagingSenderId: "305280871143",
  appId: "1:305280871143:web:d915568042b5a019a75042",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
