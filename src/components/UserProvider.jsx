import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../auth/AuthProvider.jsx"
import Fetcher from "../fetcher.js"

const UserContext = createContext()

function UserProvider({ children }) {
<<<<<<< HEAD
  //
  const [user, setUser] = useState([])
  const [freelancers, setFreelancers] = useState([])
=======
  const { userId } = useContext(AuthContext);

  const[user, setUser] = useState(null)
  const[freelancers, setFreelancers] = useState([])
>>>>>>> main
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

  useEffect(() => {
    console.log("Entered useEffect in UserProvider on userID change");
    if (userId) {
      console.log("userID is not null");
      const authFetcher = new Fetcher("auth");
      authFetcher.setToken(userId.accessToken).route("me").get(setUser);
    } else setUser(null)
  }, [userId])

  return (
    <UserContext.Provider
      value={{
        user,
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
