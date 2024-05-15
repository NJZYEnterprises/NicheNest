import React from "react"

const CarouselCard = ({ freelancer }) => {
  return (
    <div className="border rounded shadow-m p-20 m-5">
      <h2 className="text-lg font-bold">{freelancer.username}</h2>
      <p className="text-gray-600">{freelancer.email}</p>
    </div>
  )
}

export default CarouselCard
