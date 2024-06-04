import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  getAdditionalUserInfo,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"
import { auth, provider } from "./Firebase.js"
//imports to add files to firestore may work for Images
// import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import myObj from "../utils/myObj.cjs"

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const debugRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result) {
          const details = getAdditionalUserInfo(result)
          console.log(details) // details.isNewUser to determine if a new or returning user
        } else {
          // Everything is fine
        }
        console.log("redirectResult:", result);
      } catch (error) {
        console.log(error) // Debug errors from redirect response
      }
    }
    debugRedirectResult();

    console.log("onAuthStateChanged about to be called")
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log("Auth State Changed")
      if (user) {
        //everytime user signs in maybe fetch user info and then insert in user state
        setUserId(myObj.unwrap(user, ["email", "uid", "accessToken"]));
        
        setIsFetching(false)
        return
      }
      setUserId(null)
      setIsFetching(false)
    })

    return () => unsubscribe()
  }, [])

  // useEffect(() => {
  //   console.log("userId:", userId);
  // }, [userId]);

  const fireSignUp = async ({ email, password, username }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      updateProfile(auth.currentUser, {displayName: username});
      // navigate("/")
      console.log("User Successfully Created", userCredential);
      return userCredential;
    } catch (error) {
      setError(error)
      console.error("Error creating user:", error)
    }
  }

  /**
   * Sign in w/ various methods
   * @param {String} method to choose
   * @param {Object} form data required by some methods
   */
  async function signIn(method, form) {
    try {
      const methodFn = async () => {
        switch (method) {
          case "popup": return signInWithPopup(auth, provider);
          case "redirect": return signInWithRedirect(auth, provider);
          case "form":
          default: return signInWithEmailAndPassword(auth, form?.email, form?.password);
        }
      }
      const userCredential = await methodFn();
      // navigate("/");
      console.log("User Signed in successfully", userCredential);
      return userCredential;
    } catch (error) {
      console.error(`Error signing in with ${method}:`, error)
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
        signIn,
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
