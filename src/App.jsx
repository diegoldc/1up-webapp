import { Route, Routes } from "react-router-dom";
import StorePage from "./pages/StorePage";
import NavBar from "./components/NavBar";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import "./App.css";
import GamePage from "./pages/GamePage";
import AddReview from "./pages/AddReview";
import EditReviewPage from "./pages/EditReviewPage";
import ProfilePage from "./pages/ProfilePage";
import Library from "./pages/Library";
import imgLogo from "./assets/1upLogo.png";
import FilteredSearch from "./pages/FilteredSearch";
import MyGamePage from "./pages/MyGamePage";
import AddToVault from "./pages/AddToVault";
import FallbackVaultPage from "./pages/FallbackVaultPage";
import EditMyGame from "./pages/EditMyGame";
import MyReviewsPage from "./pages/MyReviewsPage";
import PlayPage from "./pages/PlayPage";

function App() {
  return (
    <>
      <img
        className="pageLogo"
        src={imgLogo}
        style={{
          width: "45px",
          height: "45px",
        }}
        alt="LOGO"
      />
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<StorePage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
        <Route path="/games/:gameId/addReview" element={<AddReview />} />
        <Route
          path="/games/:gameId/editReview/:reviewId"
          element={<EditReviewPage />}
        />
        <Route path="/profiles" element={<ProfilePage />} />
        <Route path="/vault" element={<Library />} />
        <Route
          path="/search/:filterName/:filterId/:tag"
          element={<FilteredSearch />}
        />
        <Route path="/vault/:myGameId" element={<MyGamePage />} />
        <Route path="/games/:gameId/addToVault" element={<AddToVault />} />
        <Route path="/vault/fallback" element={<FallbackVaultPage />} />
        <Route path="/vault/:myGameId/edit" element={<EditMyGame />} />
        <Route path="/myReviews/:userId" element={<MyReviewsPage />} />
        <Route path="/play" element={<PlayPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
