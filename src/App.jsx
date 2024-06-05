import React, {useState} from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./auth/AuthProvider.jsx"
import { UserProvider } from "./components/UserProvider.jsx"
import { SearchbarProvider } from "./components/SearchbarProvider.jsx"
import NavBar from "./components/NavBar.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignInForm from "./components/SignInForm.jsx"
import AllFreelancers from "./pages/AllFreelancers.jsx"
import SingleFreeLancer from "./components/SingleFreeLancer.jsx"
import Availabilities from "./pages/SingleIeFreelancerAvailability.jsx"
import Contact from "./pages/Contact.jsx"
import About from "./pages/About.jsx"
import UserContact from "./pages/UserContact.jsx";
import "./App.css"

function App() {
  return (
    <>
      <AuthProvider>
      <UserProvider>
      <SearchbarProvider>
        <div className="app-container">
          <NavBar/>
          <div className="app-body">
            <Routes>
              <Route index="/" element={<Home/>} />
              <Route path="/login" element={<SignInForm/>} />
              <Route path="/register" element={<SignInForm/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/freelancers" element={<AllFreelancers/>} />
              <Route path="/freelancers/:id" element={<SingleFreeLancer />} />
              <Route path="/availabilities/:id" element={<Availabilities />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact/:id" element={<UserContact />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </SearchbarProvider>
      </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App
