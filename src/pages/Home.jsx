import React, { useState, useContext, useEffect } from "react"
import UserCarousel from "../components/UserCarousel.jsx"
import { AuthContext } from "../auth/AuthProvider.jsx"
import { UserContext } from "../components/UserProvider.jsx"

const Home = () => {
  const { userId, isFetching } = useContext(AuthContext)
  const { user, freelancers, topRatedFreelancers } = useContext(UserContext)
  // console.log(userId.accessToken)

  if (!userId && isFetching) {
    return <div>Loading</div>
  }
  return (
    <div>
      <div className="flex justify-center text-2xl mt-3">
        {/* { user && // TODO: for testing, remove
          Object.entries(user).map(([key, value]) => <div>{key}: {typeof(value) === "object" ? "object" : value}</div>)
        } */}
      </div>
      <div className="flex flex-col gap-1">
        <div className="m-3">
          <UserCarousel freelancers={freelancers}/>
        </div>
        <div className="m-3" >
          <UserCarousel topRatedFreelancers={topRatedFreelancers}/>
        </div>
      </div>
    </div>
  )
}

export default Home
