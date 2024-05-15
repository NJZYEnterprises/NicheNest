import React, { useState, useContext, useEffect } from "react"
import FreeLancerCarousel from "../components/FreeLancerCarousel.jsx"
import TopRevieweCarousel from "../components/TopRevieweCarousel.jsx"
import { AuthContext } from "../auth/AuthProvider.jsx"

const Home = () => {
  const [freelancers, setFreelancers] = useState([])
  const { userId, isFetching, handleLogout } = useContext(AuthContext)

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/freelancers"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch freelancers")
        }
        const data = await response.json()
        setFreelancers(data)
      } catch (error) {
        console.error("Error fetching freelancers:", error)
      }
    }
    fetchFreelancers()
  }, [])

  // const topRatedFreelancers = freelancers.filter(
  //   freelancer => freelancer.rating >= 4.5
  // )

  if (!userId && isFetching) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div>
        <h1>Homepage</h1>
        <h2>Signed In As: {userId ? userId : "No One"}</h2>
      </div>
      <div>
        <FreeLancerCarousel freelancers={freelancers} />
      </div>
      <div>
        <FreeLancerCarousel freelancers={freelancers} />
      </div>
    </div>
  )
}

export default Home
