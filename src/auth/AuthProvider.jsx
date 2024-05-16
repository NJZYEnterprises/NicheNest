import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"
import { auth, provider } from "./Firebase.js"
//imports to add files to firestore may work for Images
// import { collection, doc, getDoc, setDoc } from "firebase/firestore"

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        //everytime user signs in maybe fetch user info and then insert in user state
        setUserId(user.email, user.uid)

        setIsFetching(false)
        return
      }
      setUserId(null)
      setIsFetching(false)
    })
    return () => unsubscribe()
  }, [])

  const fireSignUp = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      navigate("/")
      console.log("User Successfully Created", userCredential)
    } catch (error) {
      setError(error)
      console.error("Error creating user:", error)
    }
  }

  async function signInWithGoogleRedirect() {
    try {
      signInWithRedirect(auth, provider)
      navigate("/")
    } catch (error) {
      console.error("Error signing in with Google redirect:", error)
    }
  }

  async function fireSignIn({ email, password }) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      navigate("/")
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

  const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
  }

  return (
    <AuthContext.Provider
      value={{
        fireSignUp,
        fireSignIn,
        signInWithGoogleRedirect,
        handleLogout,
        sendPasswordResetEmail,
        isFetching,
        userId,
        useAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
