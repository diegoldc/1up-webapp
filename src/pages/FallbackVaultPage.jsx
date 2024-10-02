import { Link } from "react-router-dom"
function FallbackVaultPage() {
  return (
    <>
    <div>FallbackVaultPage</div>
    <Link to={`/vault`}>
      <button className="button3D">Go to vault</button>
    </Link>
    </>
  )
}

export default FallbackVaultPage