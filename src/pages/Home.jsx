import React, { useContext } from "react"
import { AuthContext } from "../auth/authContext"

const Home = () => {
  const { userId, handleLogout } = useContext(AuthContext)
  return (
    <div>
      <h1>Home Page</h1>
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
