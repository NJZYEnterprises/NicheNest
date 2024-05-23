import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Carousel from "react-multi-carousel"
import CarouselCard from "./CarouselCard.jsx"
import "react-multi-carousel/lib/styles.css"


const UserCarousel = ({ freelancers, topRatedFreelancers, userImages, setUserImages }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  if (userImages && userImages.length > 0) {
    return (
      <div className="bg-slate-600 bg-opacity-20 mr-20 ml-20">
        <Carousel
          responsive={responsive}
          additionalTransfrom={0}
          arrows
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {userImages.map((image, index) => (
            <div key={index} className="block m-5">
              <img src={image.image_url} alt={`User Image ${index}`} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
  
  const freelancersToDisplay = topRatedFreelancers || freelancers ;

  return (
    <div className="bg-slate-600 bg-opacity-20 mr-20 ml-20">
      <h1 className="text-2xl pt-3">
        {freelancers ? "Freelancers" : "Top Rated Freelancers"}
      </h1>
      <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {freelancersToDisplay.map(freelancer => (
          <Link
            key={freelancer.id}
            to={`/freelancers/${freelancer.id}`}
            className="block m-5"
          >
            <CarouselCard freelancer={freelancer} />
          </Link>
        ))}
      </Carousel>
    </div>
  )
}


export default UserCarousel
