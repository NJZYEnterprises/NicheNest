import React from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./auth/AuthProvider.jsx"
import NavBar from "./components/NavBar.jsx"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./pages/Home"
import "./App.css"

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route index="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
