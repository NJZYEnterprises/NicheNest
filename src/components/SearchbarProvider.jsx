import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../auth/AuthProvider.jsx"
import Fetcher from "../fetcher.js"

const SearchbarContext = createContext()

function SearchbarProvider({ children }) {
  const [filters, setFilters] = useState({
    type: '',
    query:'',
  });
  const [searchQuery, setQuery] = useState('')
  const navigate = useNavigate()
  const fetcher = new Fetcher("api")

  const setSearchQuery = (newValue) => {
    if (!newValue) newValue = '';
    if (typeof(newValue) !== "string") newValue = newValue.toString();

    setQuery(newValue);
  }

  return (
    <SearchbarContext.Provider
      value={{
        filters, setFilters, searchQuery, setSearchQuery
      }}
    >
      {children}
    </SearchbarContext.Provider>
  )
}

export { SearchbarContext, SearchbarProvider }
