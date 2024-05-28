import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Carousel from "react-multi-carousel"
import CarouselCard from "./CarouselCard.jsx"
import CarouselHomeBtns from "./CarouselHomeBtns.jsx"
import CarouselProfileBtns from "./CarouselProfileBtns.jsx"
import "react-multi-carousel/lib/styles.css"


const UserCarousel = ({ freelancers, topRatedFreelancers, userImages, deleteMode, setSelectedImage, selectedImage }) => {
  const [showArrows, setShowArrows] = useState(false);
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

  const handleImageClick = (image) => {
    if (deleteMode) {
      setSelectedImage(image);
    }
  };

  const handleMouseEnter = () => {
    setShowArrows(true);
  };

  const handleMouseLeave = () => {
    setShowArrows(false);
  };

  if (userImages && userImages.length > 0) {
    return (
      <div className="mr-21 ml-21 personal-arrow-hover" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
        <Carousel
          responsive={responsive}
          customButtonGroup={<CarouselProfileBtns/>}
          additionalTransfrom={0}
          arrows={false}
          containerClass="carousel-container"
          itemClass="carousel-item"
          renderButtonGroupOutside={true}

        >
          {userImages.map((image, index) => (
            <div key={index} 
                className={`p-2 ${deleteMode && selectedImage && selectedImage.id === image.id ? 'border-2 border-red-500' : ''}`}
                onClick={() => handleImageClick(image)}
            >
              <img src={image.image_url} alt={`User Image ${index}`} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
  
  const freelancersToDisplay = topRatedFreelancers || freelancers ;

  return (
    <div className="surface-color card mr-20 ml-20 home-arrow-hover" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h1 className="text-2xl pt-3">
        {freelancers ? "Freelancers" : "Top Rated Freelancers"}
      </h1>
      <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows={false}
        customButtonGroup={<CarouselHomeBtns />} 
        containerClass="carousel-container"
        itemClass="carousel-item"
        renderButtonGroupOutside={true}
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
