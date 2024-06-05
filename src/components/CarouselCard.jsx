import React from "react"

const CarouselCard = ({ freelancer }) => {
  const profileImage = freelancer.images.find(image => image.isProfile)

  return (
    <div className=" card px-10 py-8 birds-nest textShadow">
      {profileImage && (
        <div>
          <img
            className="rounded-md h-48 w-full object-contain"
            src={profileImage.image_url}
            alt="Profile"
          />
        </div>
      )}
      <div className="mt-3 surface-text-2 px-2 py-1">
        <h2 className="text-lg font-bold text-orange-500">{freelancer.username}</h2>
        <h2 className="text-yellow-500">
          <span aria-label="a rocket blasting off" role="img">
            ⭐
          </span>
          {freelancer.averageRating}
        </h2>

        <p className="text-gray-900 font-bold">{freelancer.email}</p>
      </div>

    </div>
  )
}

export default CarouselCard
