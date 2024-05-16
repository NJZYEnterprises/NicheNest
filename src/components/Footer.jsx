import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full width:100vw bg-gray-800">
      <div className="flex justify-center gap-20 pb-10 pt-10">
        <div>
          <h2 className="pb-2">About</h2>
          <Link>Learn About Us</Link>
        </div>
        <div className="flex flex-col">
          <h2>All Services</h2>
          <Link>Cobbler</Link>
          <Link>Ufo Hunter</Link>
          <Link>Cat Rescuer</Link>
          <Link>Psychic</Link>
        </div>
        <div>
          <h2 className="pb-2">Help</h2>
          <Link>Contact</Link>
        </div>
        <div className="flex flex-col">
          <h2 className="pb-2">Follow Us</h2>
          <Link>Instagram</Link>
          <Link>LinkedIn</Link>
        </div>
      </div>
      <div>
        <h3>© 2024 NicheNest, weirder the better!</h3>
      </div>
    </div>
  )
}

export default Footer
