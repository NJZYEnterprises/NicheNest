import React from 'react';

const CustomButtonGroup = ({ next, previous, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;

  return (
    <>
      <button
        className={`absolute left-[-10px] top-1/2 transform -translate-y-1/2 p-2 bg-transparent rounded z-10 carousel-button`}
        onClick={() => previous()}
        disabled={currentSlide === 0}
      >
      <span class="material-symbols-outlined">
        arrow_back_ios
      </span>
      </button>
      <button
        className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 p-2 bg-transparent rounded z-10 carousel-button"
        onClick={() => next()}
      >
        <span class="material-symbols-outlined">
        arrow_forward_ios
        </span>
      </button>
    </>
  );
};

export default CustomButtonGroup;
