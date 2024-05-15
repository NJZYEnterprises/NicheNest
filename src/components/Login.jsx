import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../auth/AuthProvider.jsx"
// import { signInWithGoogleRedirect } from "../auth/firebase"
import GoogleButton from "react-google-button"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [redirecting, setRedirecting] = useState(true)
  const { fireSignIn, signInWithGoogleRedirect, userId, isFetching  } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSignInWithGoogle = async () => {
    try {
      setRedirecting(true);
      await signInWithGoogleRedirect();
      // Wait for 2 seconds before navigating
    } catch (error) {
      console.error("Google sign-in redirect failed:", error);
    } finally {
      setRedirecting(false);
    }
  };
  
  
  const handleSubmit = async e => {
    e.preventDefault()
    console.log(formData)
    await fireSignIn(formData)
  }

  const handleForgotPassword = () => {
    navigate.push("/reset-password")
  }

  const handleRegister = () => {
    navigate.push("/register")
  }
  if(!redirecting) {
    return <div>Loading</div>
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login</button>
      <div>
        <GoogleButton onClick={handleSignInWithGoogle} />
      </div>
      <button type="button" onClick={handleForgotPassword}>
        Forgot Password?
      </button>
      <button type="button" onClick={handleRegister}>
        New user? Register here
      </button>
    </form>
  )
}

export default Login
