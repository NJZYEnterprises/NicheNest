import React from 'react'
import "../carousel.css"

const CarouselProfileBtns = ({next, previous}) => {
  return (
    <div className="personal-button-group">
    <button className="personal-button left" onClick={previous}>
    <span class="material-symbols-outlined">
      arrow_back_ios
    </span>
    </button>
    <button className="personal-button right" onClick={next}>
      <span class="material-symbols-outlined">
        arrow_forward_ios
      </span>
    </button>
  </div>
  )
}

export default CarouselProfileBtns