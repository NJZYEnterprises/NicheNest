import React, {useState} from 'react'

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('') 

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchQuery)
  }
  
  return (
    <div>
      <input 
        placeholder="Enter Service..." 
        value={searchQuery} 
        onChange={(e) => {
          setSearchQuery(e.target.value) // Update the searchQuery state
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Searchbar