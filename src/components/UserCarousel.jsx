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
    const freelancersToDisplay = topRatedFreelancers || freelancers;

    return (
      <div className="carousel-wrapper width" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {userImages && userImages.length > 0 && (
          <div className="carousel-size profile-carousel arrow-hover">
            <div className="flex flex-col justify-around">
            <Carousel
              responsive={responsive}
              customButtonGroup={<CustomButtonGroup isHome={false} />}
              additionalTransfrom={0}
              arrows={false}
              containerClass="carousel-container"
              itemClass="carousel-item"
              renderButtonGroupOutside={true}
            >
              {userImages
                .sort((a, b) => (a.isProfile ? -1 : 1))
                .map((image, index) => (
                  <div
                    key={index}
                    className={`rounded-xl m-3${deleteMode && selectedImage && selectedImage.id === image.id ? 'shadow-lg shadow-red' : ''}`}
                    onClick={() => handleImageClick(image)}
                  >
                    {editMode && image.isProfile && (
                      <div className="absolute top-2 right-2 p-1">
                        <span className="material-symbols-outlined profile-icon">
                          account_circle
                        </span>
                      </div>
                    )}
                    <div className="">
                      <img src={image.image_url} alt={`User Image ${index}`} className="h-64 w-full rounded-lg object-contain" />
                    </div>
                  </div>
                ))}
            </Carousel>
            </div>
          </div>
        )}
        {freelancersToDisplay && freelancersToDisplay.length > 0 && (
          <div className="carousel-size arrow-hover">
            <div className="surface-color card carousel-container">
              <Link to="/freelancers" className="home-title-text text-4xl searchbar-text-color">
                {freelancers ? (
                  <h1 className='pt-3 transition-transform duration-300 ease-in-out transform hover:scale-105'>Freelancers</h1>
                ) : (
                  <h1 className='pt-3 transition-transform duration-300 ease-in-out transform hover:scale-105'>Top Rated Freelancers</h1>
                )}
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
                    className="block m-5 transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-lg"
                  >
                    <CarouselCard freelancer={freelancer} />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </div>
);
};


export default UserCarousel
