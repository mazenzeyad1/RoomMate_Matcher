import { Route, Routes as ReactRoutes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/navbar/Navbar"
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import MatchProfileCreator from "./pages/MatchProfileCreator";
import MatchProfileSuccessPage from "./pages/MatchProfileSuccess";
import ListingDetails from "./pages/ListingDetail";
import CreateListingPage from "./pages/CreateListing";
import ListingCreationSuccessPage from "./pages/ListingCreationSuccess";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <ReactRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/match-profile-creator" element={<MatchProfileCreator />} />
            <Route path="/profile-created" element={<MatchProfileSuccessPage />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            <Route path="/create-listing" element={<CreateListingPage />} />
            <Route path="/create-listing-success" element={<ListingCreationSuccessPage />} />
          </ReactRoutes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
