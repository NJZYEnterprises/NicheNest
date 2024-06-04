import React from "react"

const CarouselCard = ({ freelancer }) => {
  const profileImage = freelancer.images.find(image => image.isProfile)

  return (
    <div className="rounded shadow-m p-10 birds-nest ">
      {profileImage && (
        <div>
          <img
            className="rounded-md h-48 w-full"
            src={profileImage.image_url}
            alt="Profile"
          />
        </div>
      )}
      <div className="mt-3">
        <h2 className="text-lg font-bold">{freelancer.username}</h2>
        <h2>
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
