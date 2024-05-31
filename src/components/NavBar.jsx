import React, { useState, useContext } from 'react'
import Searchbar from "./Searchbar"
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider"
import { UserContext } from "./UserProvider"
import loginIcon from "../assets/login.svg";
import accountIcon from "../assets/account.svg";
import logo from "../assets/logo.png";
import navbarTitle from "../assets/navbarTitle.png"


const Navbar = () => {
  const { userId, handleLogout} = useContext(AuthContext)
  const { user } = useContext(UserContext)

  const profileImage = user?.images.find(image => image.isProfile);
  const profileImageUrl = profileImage ? profileImage.image_url : null;

console.log(profileImageUrl);
  
  return (
  <div className="flex flex-col sticky top-0 sky-scene" style={{zIndex: 2000/*, backgroundImage: "linear-gradient(var(--primaryColor) 60%, var(--surfaceColor))"*/ }}>
    <div className="flex flex-col justify-around mx-10">
      <div className='flex justify-around items-center'>
      <div className="flex justify-center items-center">
        <Link to={'/'}>
            <img src={logo} alt="Logo" className="h-28 w-38 rounded-lg shadow-2xl" />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center mx-26 mt-1">
        <Link to="/" className="text-3xl">
          <img className="h-20 w-full" src={navbarTitle} />
        </Link>
        <Searchbar/>
      </div>
      {userId ? (
        <div className='flex justify-center items-center gap-5'>
          <div className='flex flex-col justify-center items-center'>
          <Link to={"/profile"}>
            <img src={profileImageUrl} style={{ borderRadius: '50%' }} alt="Profile" className='h-16 w-16 ' />
          </Link> 
          <p>Signed In As:</p>
          </div>
          <button onClick={handleLogout}>
            <span class="material-symbols-outlined flex justify-center items-center">
              logout
            </span>
          </button>
        </div>
      ) : (
        <Link to={"/login"}>
        <span class="material-symbols-outlined">
          login
        </span>
        </Link>
      )
      }
      </div>
    </div>
  </div> 
  )
};

export default Navbar;
