import React, { useState, useEffect } from "react"
import Carousel from "react-multi-carousel"
import CarouselCard from "./CarouselCard.jsx"
import "react-multi-carousel/lib/styles.css"

const FreeLancerCarousel = ({ freelancers }) => {
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

  return (
    <div className="bg-slate-600 bg-opacity-20 p-10">
      <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {freelancers.map(freelancer => (
          <CarouselCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </Carousel>
    </div>
  )
}

export default FreeLancerCarousel