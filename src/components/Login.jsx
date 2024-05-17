import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../auth/AuthProvider.jsx"
// import { signInWithGoogleRedirect } from "../auth/firebase"
import GoogleButton from "react-google-button"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  // const [redirecting, setRedirecting] = useState(true) // TODO: move this state into Auth Context
  const { signIn, userId, isFetching } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      // setRedirecting(true);
      await signIn("popup");
      // await signInWithGoogleRedirect();
      // Wait for 2 seconds before navigating
    } catch (error) {
      console.error("Google sign-in redirect failed:", error);
    } finally {
      // setRedirecting(false);
    }
  };
  
  
  const handleSubmit = async e => {
    e.preventDefault()
    console.log(formData)
    await signIn("form", formData);
    // await fireSignIn(formData)
  }

  const handleForgotPassword = () => {
    navigate.push("/reset-password")
  }

  const handleRegister = () => {
    navigate("/register");
  }
  // if(!redirecting) {
  //   return <div>Loading</div>
  // }
  
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
      <div>Don't have an account? <Link to="/register" className="underline">Register</Link></div>
    </form>
  )
}

export default Login
