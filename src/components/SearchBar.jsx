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
    <>
    <input type="text" placeholder="search" onChange={(event) => setSearch(event.target.value)} value={search} />
    <button onClick={handleSearch}>Search</button>
    </>

  )
}

export default SearchBar