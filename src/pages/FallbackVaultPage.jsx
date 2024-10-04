import { Link } from "react-router-dom";
import facepalm from "../assets/fallback.png";

function FallbackVaultPage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Looks like you forgot you already added this game to your vault!</h1>
      <img
        style={{ width: "90vw", maxWidth: "600px", margin: "50px" }}
        src={facepalm}
        alt=""
      />
      <Link to={`/vault`}>
        <button className="button3D">Go to vault</button>
      </Link>
    </div>
  );
}

export default FallbackVaultPage;
