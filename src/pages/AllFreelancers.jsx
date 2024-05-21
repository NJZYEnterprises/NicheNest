import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../components/UserProvider.jsx"
import DisplayAllFreelancers from "../components/DisplayAllFreelancers.jsx"



const AllFreelancers = () => {
  const { freelancers } = useContext(UserContext)
  return (
    <div className="flex felx-col flex-wrap">
        <DisplayAllFreelancers freelancers= {freelancers}/>
    </div>
  )
}
export default AllFreelancers
