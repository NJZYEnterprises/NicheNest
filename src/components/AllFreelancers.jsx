import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarouselCard from "./CarouselCard.jsx";



const DisplayAllFreelancers = ({ freelancers }) => {
  const freelancersToDisplay = freelancers
  return (
    <>
        {freelancersToDisplay.map(freelancer => (
          <Link
            key={freelancer.id}
            to={`/${freelancer.id}`}
            className="block m-5"
          >
            <CarouselCard freelancer={freelancer} />
          </Link>
        ))}
    </>

  )

}

export default DisplayAllFreelancers