import React from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./auth/AuthProvider.jsx"
import { UserProvider } from "./components/UserProvider.jsx"
import NavBar from "./components/NavBar.jsx"
import Footer from "./components/Footer.jsx"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Contact from "./pages/Contact.jsx"
import "./App.css"

function App() {
  return (
    <>
      <AuthProvider>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route index="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App
