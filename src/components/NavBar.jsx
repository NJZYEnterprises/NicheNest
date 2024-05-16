import React, { useState, useContext } from 'react'
import Searchbar from "./Searchbar"
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider"
import loginIcon from "../assets/login.svg";
import accountIcon from "../assets/account.svg";

const Navbar = () => {
  const { userId, handleLogout} = useContext(AuthContext)

  return <div className="flex flex-col bg-gray-800 sticky top-0 p-3">
    <div className="flex flex-row justify-around">
      <Link to={'/'}>
        <div>
          <img src="TODO" alt="Logo" width="60" height="48" />
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
    <div id="TODO: replace with SearchBarComponent">
      <Searchbar/>
      <h2>Filters go here</h2>
    </div>
  </div>
};

export default Navbar;
