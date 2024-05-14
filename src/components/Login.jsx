import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../auth/authContext"
import GoogleButton from "react-google-button"
import { signInWithGoogleRedirect } from "../auth/firebase"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { fireSignIn } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSignInWithGoogle = async () => {
    signInWithGoogleRedirect()
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(formData)
    fireSignIn(formData)
  }

  const handleForgotPassword = () => {
    navigate.push("/reset-password")
  }

  const handleRegister = () => {
    navigate.push("/register")
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
