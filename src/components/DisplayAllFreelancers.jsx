import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CarouselCard from "./CarouselCard.jsx";



const DisplayAllFreelancers = ({ freelancers }) => {
  const freelancersToDisplay = freelancers
  return (
    <>
        <div className="flex flex-grow flex-wrap surface-color card profile-spacing justify-center">
          {freelancersToDisplay.map(freelancer => (
            <Link
              key={freelancer.id}
              to={`/freelancers/${freelancer.id}`}
              className="block m-5"
            >
              <CarouselCard freelancer={freelancer} />
            </Link>
          ))}
        </div>
    </>

  )

}

export default DisplayAllFreelancers