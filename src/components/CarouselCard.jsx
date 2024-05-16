import React from "react"

const CarouselCard = ({ freelancer }) => {
  const profileImage = freelancer.images.find(image => image.isProfile)

  return (
    <div className="rounded shadow-m p-10 m-5 bg-slate-800">
      {profileImage && (
        <img
          className="rounded-md"
          src={profileImage.image_url}
          alt="Profile"
        />
      )}
      <h2 className="text-lg font-bold">{freelancer.username}</h2>
      <h2>{freelancer.averageRating}</h2>

      <p className="text-gray-600">{freelancer.email}</p>
    </div>
  )
}

export default CarouselCard
