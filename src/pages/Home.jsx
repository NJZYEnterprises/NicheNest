import React, { useState, useContext, useEffect } from "react"
import UserCarousel from "../components/UserCarousel.jsx"
import { AuthContext } from "../auth/AuthProvider.jsx"
import { UserContext } from "../components/UserProvider.jsx"
import Fetcher from "../fetcher.js"

const Home = () => {

  const { userId, isFetching } = useContext(AuthContext)
  const { freelancers, topRatedFreelancers } = useContext(UserContext)


  if (!userId && isFetching)  {
    return <div>Loading</div>
  }
  console.log(topRatedFreelancers)
  return (
    <div>
      <div className="text-2xl m-10">
        <h2>Signed In As: {userId ? userId : "No One.."}</h2>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <UserCarousel freelancers={freelancers}/>
        </div>
        <div>
          <UserCarousel topRatedFreelancers={topRatedFreelancers}/>
        </div>
      </div>
    </div>
  )
}

export default Home
