import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDqGcWIaj3RUGQYRHDR0nTQGX01oM4FtIs",
  authDomain: "sopets-website.firebaseapp.com",
  projectId: "sopets-website",
  storageBucket: "sopets-website.firebasestorage.app",
  messagingSenderId: "292375912753",
  appId: "1:292375912753:web:feba18e3c02e014a229010",
  measurementId: "G-11YL6CT2QV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

export default app