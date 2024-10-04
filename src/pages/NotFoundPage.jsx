import { Link } from "react-router-dom";
import notFound from "../assets/notFound.png";

function NotFoundPage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>It's easy to lose your way when you're exploring...</h1>
      <img
        style={{ width: "90vw", maxWidth: "500px", marginBottom: "20px" }}
        src={notFound}
        alt=""
      />
      <Link to="/explore">
        <button className="button3D">Home</button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
