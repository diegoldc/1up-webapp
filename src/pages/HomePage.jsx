import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/explore");
  }, []);
  return <></>;
}

export default HomePage;
