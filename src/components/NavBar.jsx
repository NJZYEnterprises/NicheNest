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
  <div className="flex flex-col flex-grow sticky top-0 sky-scene" style={{zIndex: 2000/*, backgroundImage: "linear-gradient(var(--primaryColor) 60%, var(--surfaceColor))"*/ }}>
    <div className="flex flex-col justify-around mx-10 m-2">
      <div className='flex justify-around items-center'>
          <Link to={'/'}>
              <img src={logo} alt="Logo" className="h-28 w-38 rounded-lg shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105" />
          </Link>
      <div className="flex flex-col justify-center items-center mx-26 mb-2">
          <img className="h-20 w-full transition-transform duration-300 ease-in-out transform hover:scale-110" src={navbarTitle} />
          <Searchbar/>
      </div>
      <div className='h-auto w-36'>
        {userId ? (
          <div className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <Link to={"/profile"}>
                <img src={profileImageUrl} style={{ borderRadius: '50%' }} alt="Profile" className='h-16 w-16 transition-transform duration-300 ease-in-out transform hover:scale-105' />
              </Link> 
              <p className="text-xs searchbar-text-color">Signed In As:<p className="navbar-text-color font-bold">{userId?.email ?? ""}</p></p>
            </div>
            <button 
              onClick={handleLogout} 
              className="transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="material-symbols-outlined flex justify-center items-center">
                logout
              </span>
            </button>
          </div>
        ) : (
          <Link to={"/login"}>
          <span class="material-symbols-outlined transition-transform duration-200 ease-in-out transform hover:scale-110">
            login
          </span>
          </Link>
        )
        }
      </div>
      </div>
    </div>
  </div> 
  )
};

export default Navbar;
