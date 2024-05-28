import React from 'react';
import "../carousel.css";

const CustomButtonGroup = ({ next, previous, isHome }) => {
  const buttonGroupClass = isHome ? "isHome button-group" : "isDetails button-group";
  const buttonClass = isHome ? "isHome button" : "isDetails button";

  return (
    <div className={buttonGroupClass}>
      <button className={`${buttonClass} left`} onClick={previous}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </button>
      <button className={`${buttonClass} right`} onClick={next}>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>
    </div>
  );
};

export default CustomButtonGroup;
