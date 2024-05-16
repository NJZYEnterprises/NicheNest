import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Fetcher from "../fetcher.js"

const UserContext = createContext()

function UserProvider({ children }) {
  const[freelancers, setFreelancers] = useState([])
  const [topRatedFreelancers, setTopRatedFreelancers] = useState([])
  const navigate = useNavigate()
  const fetcher = new Fetcher("api")

//fetch freelancers
  useEffect(() => {
    fetcher.route("/users/freelancers").get(data => {
      const updatedFreelancers = data.map(freelancer => {
        const totalStars = freelancer.reviews_received.reduce(
          (acc, review) => acc + review.star_review,
          0
        )
        //Creates average rating for each freelacer
        const averageRating =
          freelancer.reviews_received.length > 0
            ? totalStars / freelancer.reviews_received.length
            : 0
        return { ...freelancer, averageRating }
      })
      setFreelancers(updatedFreelancers)
    })
  }, [])

  //sorts top rated freelancers, runs everytime freelancers is updated  
  useEffect(() => {
    const sortedFreelancers = [...freelancers].sort(
      (a, b) => b.averageRating - a.averageRating
    )
    const topRatedFreelancers = sortedFreelancers.slice(0, 10)
    setTopRatedFreelancers(topRatedFreelancers)
  }, [freelancers])

  return (
    <UserContext.Provider
      value={{
        freelancers,
        setFreelancers,
        topRatedFreelancers,
        setTopRatedFreelancers
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
