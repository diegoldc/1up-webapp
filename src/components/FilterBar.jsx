import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function FilterBar() {
  const [genres, setGenres] = useState(null);
  const [platforms, setPlatforms] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const genresData = await axios.get(
        `${import.meta.env.VITE_RAWG_URL}/genres${
          import.meta.env.VITE_RAWG_KEY
        }`
      );
      setGenres(genresData.data.results);
    } catch (error) {
      console.log("error genres", error);
    }
    try {
      const platformsData = await axios.get(
        `${import.meta.env.VITE_RAWG_URL}/platforms${
          import.meta.env.VITE_RAWG_KEY
        }`
      );
      setPlatforms(platformsData.data.results);
    } catch (error) {
      console.log("error platforms", error);
    }
  };

  if (genres === null || platforms === null) {
    return null;
  }

  return (
    <nav
      style={{
        margin: "5px 0px 20px 0",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <DropdownButton id="dropdown-basic-button" title="Genre" variant="Secondary">

        {genres.map((eachGenre, index) => {
          return (
            <Dropdown.Item style={{backgroundColor:"rgb(47, 78, 95)",color:"lightblue"}} key={index} href={`/search/genres/${eachGenre.id}/${eachGenre.name}`}>
              {eachGenre.name}
            </Dropdown.Item>
          );
        })}

      </DropdownButton>
      <DropdownButton id="dropdown-basic-button" title="Platforms" variant="Secondary" >
  
      {platforms.map((eachPlatform, index) => {
          return (
            <Dropdown.Item style={{backgroundColor:"rgb(47, 78, 95)",color:"lightblue"}} key={index} href={`/search/platforms/${eachPlatform.id}/${eachPlatform.name}`}>
              {eachPlatform.name}
            </Dropdown.Item>
          );
        })}

      </DropdownButton>
    </nav>
  );
}

export default FilterBar;
