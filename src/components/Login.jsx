import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
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