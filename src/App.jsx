import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./pages/Home"
import "./App.css"

function App() {
  return (
    <>
      <h1 className="text-red-400">Welcome to Niche Nest!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
