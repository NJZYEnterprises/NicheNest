import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"
import { auth } from "../firebase/index.js"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { useLocalStorage } from "./useLocalStorage"

import { addUser } from "./sql.js"
import { fetchUser } from "../../subComponents/sql.js"

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid)
        setIsFetching(false)
        return
      }
      setUserId(null)
      setIsFetching(false)
    })
    return () => unsubscribe()
  }, [])

  const fireSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log("User Successfully Created", userCredential)
    } catch (error) {
      setError(error)
      console.error("Error creating user:", error)
    }
  }

  async function fireSignIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log("User Signed in successfully", userCredential)
    } catch (error) {
      setError(error)
      console.log("User Signed in failed", error)
    } finally {
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      //if we need to navigate on logout
      //setUser(null);
      setUserInfo({ user: null, anotherValue: null })
      navigate("/")
      console.log("User signed out successfully")
    } catch (error) {
      console.error(error, "logged out unsuccessfully")
    }
  }

  async function sendPasswordResetEmail(email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
      setError(null)
      console.log("Password reset email sent successfully!")
    } catch (error) {
      setError(error)
    }
  }

  // DB DATA FETCHER FOR CONSTANT UPDATE
  // BUT CAN WORK FOR OTHER USER CASES
  // async function fetchUserData(userId) {
  //   try {
  //     const usersRef = doc(collection(db, "users"), userId)
  //     const docSnapshot = await getDoc(usersRef)

  //     if (docSnapshot.exists) {
  //       return docSnapshot.data()
  //     } else {
  //       return null
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error)
  //     throw error
  //   }
  // }

  return (
    <AuthContext.Provider
      value={{
        fireSignUp,
        fireSignIn,
        handleLogout,
        sendPasswordResetEmail,
        isFetching,
        userId,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthContext, AuthProvider, useAuth }
