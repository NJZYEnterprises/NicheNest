import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Carousel from "react-multi-carousel"
import CarouselCard from "./CarouselCard.jsx"
import CustomButtonGroup from "./CustomButtonGroup.jsx"
import "../carousel.css"
import "react-multi-carousel/lib/styles.css"


const UserCarousel = ({ freelancers, topRatedFreelancers, userImages, deleteMode, editMode, setSelectedImage, selectedImage }) => {
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
      <div className="mr-21 ml-21 arrow-hover" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
        <Carousel
          responsive={responsive}
          customButtonGroup={<CustomButtonGroup isHome={false}/>}
          additionalTransfrom={0}
          arrows={false}
          containerClass="carousel-container"
          itemClass="carousel-item"
          renderButtonGroupOutside={true}

        >
          {userImages
          .sort((a, b) => (a.isProfile ? -1 : 1)) 
          .map((image, index) => (
            <div key={index} 
                className={`p-2 ${deleteMode && selectedImage && selectedImage.id === image.id ? 'border-2 border-red-500' : ''}`}
                onClick={() => handleImageClick(image)}
            >
                    {editMode && image.isProfile && (
            <div className="absolute top-2 right-2 p-1">
              <span class="material-symbols-outlined profile-icon">
                account_circle
              </span>
            </div>
      )}

              <img src={image.image_url} alt={`User Image ${index}`} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
  
  const freelancersToDisplay = topRatedFreelancers || freelancers ;

  return (
    <div className="surface-color card mr-20 ml-20 arrow-hover" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <Link to="/freelancers" className="text-2xl pt-3">
        {freelancers ? "Freelancers" : "Top Rated Freelancers"}
    </Link>
      <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows={false}
        customButtonGroup={<CustomButtonGroup isHome={true} />} 
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
