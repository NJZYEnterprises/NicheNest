import React from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./auth/AuthProvider.jsx"
import { UserProvider } from "./components/UserProvider.jsx"
import NavBar from "./components/NavBar.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignInForm from "./components/SignInForm.jsx"
import AllFreelancers from "./pages/AllFreelancers.jsx"
import SingleFreeLancer from "./components/SingleFreeLancer.jsx"
import Availabilities from "./pages/SingleInstructorAvailability.jsx" 
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
          <Route path="/login" element={<SignInForm/>} />
          <Route path="/register" element={<SignInForm/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/freelancers" element={<AllFreelancers />} />
          <Route path="/freelancers/:id" element={<SingleFreeLancer />} />
          <Route path="/availabilities/:id" element={<Availabilities />} />
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
