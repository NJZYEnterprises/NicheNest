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
import AllFreelancers from "./pages/AllFreelancers.jsx"
import Contact from "./pages/Contact.jsx"
import About from "./pages/About.jsx"
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
          <Route path="/freelancers" element={<AllFreelancers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App
