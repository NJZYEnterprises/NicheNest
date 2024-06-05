import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {

  return (
    <div className="footer-margin bottom-0 left-0 right-0 ground-scene flex flex-col items-center textShadow">
      <div className="flex justify-center pb-10 pt-10">
        <div className="flex justify-center gap-20 w-max flex p-4">
          <div>
            <h2 className="flex flex-col pb-2">About</h2>
            <Link to="/about">Learn About Us</Link>
          </div>
          <div className="flex flex-col">
            <h2 className="pb-2">All Services</h2>
            <Link path="">Cobbler</Link>
            <Link path="">Ufo Hunter</Link>
            <Link path="">Cat Rescuer</Link>
            <Link path="">Psychic</Link>
          </div>
          <div>
            <h2 className="flex flex-col pb-2">Help</h2>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="flex flex-col pb-2">
            <h2 className="pb-2">Follow Us</h2>
            <Link path="">Instagram</Link>
            <Link path="">LinkedIn</Link>
          </div>
        </div>
      </div>
      <div className="surface-text-2 w-max flex px-2">
        <h3>© 2024 NicheNest, the weirder the better!</h3>
      </div>
    </div>
  )
}

export default Footer
