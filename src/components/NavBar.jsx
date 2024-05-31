import React, { useState, useContext } from 'react'
import Searchbar from "./Searchbar"
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider"
import loginIcon from "../assets/login.svg";
import accountIcon from "../assets/account.svg";
import logo from "../assets/logo.png";


const Navbar = () => {
  const { userId, handleLogout} = useContext(AuthContext)
  
  return <div className="flex flex-col sticky top-0 p-3 sky-scene" style={{zIndex: 2000/*, backgroundImage: "linear-gradient(var(--primaryColor) 60%, var(--surfaceColor))"*/ }}>
    <div className="flex flex-row justify-around">
      <Link to={'/'}>
        <div>
          <img src={logo} alt="Logo" width="60" height="48" />
        </div>
      </Link>
      <div className="flex flex-col justify-center">
        <Link to="/" className="text-3xl">Niche Nest</Link>
      </div>
      {userId ? (
        <>
        <Link to={"/profile"}>
          <img src={accountIcon} alt="Profile" width="60" height="48" />
        </Link> 
        <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to={"/login"}>
          <img src={loginIcon} alt="Login" width="60" height="48" />
        </Link>
      )
      }
    </div>
    <div>
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    </div>
  </div> 
};

export default Navbar;
