import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../auth/AuthProvider.jsx"

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { fireSignUp, signInWithGoogleRedirect } = useContext(AuthContext)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    fireSignUp(formData)
    console.log("Form data submitted:", formData)
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
      <button type="submit">Register Now</button>
      <div>Already have an account? <Link to="/login" className="underline">Login</Link></div>
    </form>
  )
}

export default Register
