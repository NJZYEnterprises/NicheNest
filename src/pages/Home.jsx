import React, { useContext } from "react"
import { AuthContext } from "../auth/AuthContext.jsx"

const Home = () => {
  const { userId, isFetching, handleLogout } = useContext(AuthContext)

  if(!userId && isFetching) {
    return <div>Loading</div>
  }

  return (
    <div>
    
      <h1 className="text-red-400">Welcome to Niche Nest!</h1>
      <h2>Signed In As: {userId ? userId : "No One"}</h2>
      {userId && (
        <div>
          <button
            onClick={() => {
              handleLogout()
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
