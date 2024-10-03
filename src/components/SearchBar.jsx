import axios from "axios";
import { useState } from "react";

function SearchBar({ setGameList }) {
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_RAWG_URL}/games${
          import.meta.env.VITE_RAWG_KEY
        }&search=${search}`
      );
      setGameList(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="input-container"
      style={{ marginBottom: "20px", marginTop: "20px" }}
    >
      <input
        autoComplete="off"
        id="input"
        className="input"
        type="text"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />
      <label htmlFor="input" className="label">
        Search Game
      </label>
      <div className="topline"></div>
      <div className="underline"></div>
      <button className="button3D" style={{marginTop:"20px",height:"40px",paddingTop:"8px"}} onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
