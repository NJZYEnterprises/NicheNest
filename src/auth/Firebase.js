// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { firebaseConfig } from "../envPackager.cjs";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//providers
export const provider = new GoogleAuthProvider()

// Initialize Firebase
const app = initializeApp(firebaseConfig(import.meta.env))
export const auth = getAuth(app)

// TODO: remove if analystics are never needed
// import { getAnalytics } from "firebase/analytics"
// const analytics = getAnalytics(app)