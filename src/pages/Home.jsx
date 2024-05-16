import React, { useState, useContext, useEffect } from "react"
import UserCarousel from "../components/UserCarousel.jsx"
import { AuthContext } from "../auth/AuthProvider.jsx"
import { UserContext } from "../components/UserProvider.jsx"
import Fetcher from "../fetcher.js"

const Home = () => {

  const { userId, isFetching } = useContext(AuthContext)
  const { freelancers, topRatedFreelancers } = useContext(UserContext)


  // useEffect(() => {
  //   fetcher.route("/users/freelancers").get(data => {
  //     const updatedFreelancers = data.map(freelancer => {
  //       const totalStars = freelancer.reviews_received.reduce(
  //         (acc, review) => acc + review.star_review,
  //         0
  //       )
  //       const averageRating =
  //         freelancer.reviews_received.length > 0
  //           ? totalStars / freelancer.reviews_received.length
  //           : 0
  //       return { ...freelancer, averageRating }
  //     })
  //     setFreelancers(updatedFreelancers)
  //   })
  // }, [])

  // useEffect(() => {
  //   const sortedFreelancers = [...freelancers].sort(
  //     (a, b) => b.averageRating - a.averageRating
  //   )
  //   const topRatedFreelancers = sortedFreelancers.slice(0, 10)
  //   setTopRatedFreelancers(topRatedFreelancers)
  // }, [freelancers])

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
