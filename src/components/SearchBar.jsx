import axios from "axios"
import { useState } from "react"

function SearchBar({setGameList}) {

  const [search, setSearch] = useState("")

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_RAWG_URL}/games${import.meta.env.VITE_RAWG_KEY}&search=${search}`)
      console.log(response)
      setGameList(response.data.results)
      // setSearch("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="input-container" style={{marginBottom:"20px", marginTop:"20px"}}>
    <input className="input" type="text" placeholder="search" onChange={(event) => setSearch(event.target.value)} value={search} />
    <label htmlFor="input" className="label">Enter Your Name</label>
    <div className="topline"></div>
<div className="underline"></div>
<button onClick={handleSearch}>Search</button>
    </div>

    

  )
}

export default SearchBar