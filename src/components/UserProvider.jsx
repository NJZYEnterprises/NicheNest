import { createContext, useState, useEffect, useContext } from "react"
import { AuthContext } from "../auth/AuthProvider.jsx"
import { calculateAverageRating } from "../../utils/profileUtils";
import Fetcher from "../fetcher.js"

const UserContext = createContext();
const apiFetcher = new Fetcher("api");
const authFetcher = new Fetcher("auth");

function UserProvider({ children }) {
  const { userId } = useContext(AuthContext); 
  const[user, setUser] = useState(null);
  const[freelancers, setFreelancers] = useState([]);
  const [topRatedFreelancers, setTopRatedFreelancers] = useState([]);

  const updateUser = async () => {
    if (userId) {
      return authFetcher.setToken(userId.accessToken).route("me").get(setUser);
    } else setUser(null);
  }
  const updateFreelancers = async () => {
    apiFetcher.route("/users/freelancers").get(newFreelancers => {
      newFreelancers.forEach(freelancer => calculateAverageRating(freelancer));
      setFreelancers(newFreelancers);
    })
  }

  //fetch freelancers
  useEffect(() => {
    updateFreelancers();
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
    updateUser();
  }, [userId])

  useEffect(() => {
    console.log("user changed:", user);
  }, [user])

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        freelancers,
        updateFreelancers,
        topRatedFreelancers,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
