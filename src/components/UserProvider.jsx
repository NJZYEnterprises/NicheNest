import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../auth/AuthProvider.jsx"
import { calculateAverageRating } from "../../utils/profileUtils";
import Fetcher from "../fetcher.js"

const UserContext = createContext()

function UserProvider({ children }) {
  const { userId } = useContext(AuthContext); 
  const[user, setUser] = useState(null)
  const[freelancers, setFreelancers] = useState([])
  const [topRatedFreelancers, setTopRatedFreelancers] = useState([])
  const navigate = useNavigate()
  const fetcher = new Fetcher("api")

//fetch freelancers
  useEffect(() => {
    fetcher.route("/users/freelancers").get(newFreelancers => {
      newFreelancers.forEach(freelancer => calculateAverageRating(freelancer));
      setFreelancers(newFreelancers);
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
        setUser,
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
