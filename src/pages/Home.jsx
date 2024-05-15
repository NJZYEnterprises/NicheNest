import React, { useState, useContext, useEffect } from "react"
import FreeLancerCarousel from "../components/FreeLancerCarousel.jsx"
import TopRevieweCarousel from "../components/TopRevieweCarousel.jsx"
import { AuthContext } from "../auth/AuthProvider.jsx"
import Fetcher from "../fetcher.js"

const Home = () => {
  const [freelancers, setFreelancers] = useState([])
  const { userId, isFetching, handleLogout } = useContext(AuthContext)
  const fetcher = new Fetcher("api")

  useEffect(() => {
    fetcher.route("/users/freelancers").get(setFreelancers)
  }, [])

  if (!userId && isFetching) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div>
        <h1>Homepage</h1>
        <h2>Signed In As: {userId ? userId : "No One"}</h2>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <FreeLancerCarousel freelancers={freelancers} />
        </div>
        <div>
          <FreeLancerCarousel freelancers={freelancers} />
        </div>
      </div>
    </div>
  )
}

export default Home
