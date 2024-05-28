
import React from 'react';
import "../carousel.css"

const CarouselHomeBtns = ({ next, previous }) => {
  return (
    <div className="home-button-group">
      <button className="home-button left" onClick={previous}>
      <span class="material-symbols-outlined">
        arrow_back_ios
      </span>
      </button>
      <button className="home-button right" onClick={next}>
        <span class="material-symbols-outlined">
          arrow_forward_ios
        </span>
      </button>
    </div>
  );
};

export default CarouselHomeBtns;
