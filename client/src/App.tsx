import { Route, Routes as ReactRoutes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signUp/SignUp";
import { Toaster } from "client/src/@/components/ui/toast/Toaster";
import { Routes } from "./utils";
import { Listings } from "./pages/listings/Listings";
import Navbar from "./components/navbar/Navbar";
import { MyListings } from "./pages/myListings/MyListings";
import { MyListing } from "./pages/myListings/myListing/MyListing";
import { Listing } from "./pages/listings/Listing/Listing";
import { AppliedTo } from "./pages/appliedTo/AppliedTo";
import { EditProfile } from "./pages/profile/EditProfile";

function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <ReactRoutes>
        <Route path={Routes.LOGIN} element={<Login />} />
        <Route path={Routes.SIGN_UP} element={<SignUp />} />
        <Route path={Routes.LISTINGS} element={<Listings />} />
        <Route path={`${Routes.LISTINGS}/:id`} element={<Listing />} />
        <Route path={Routes.MY_LISTINGS} element={<MyListings />} />
        <Route path={`${Routes.MY_LISTINGS}/:id`} element={<MyListing />} />
        <Route path={Routes.MY_APPLICATIONS} element={<AppliedTo />} />
        <Route path={Routes.MY_PROFILE} element={<EditProfile />} />
      </ReactRoutes>
    </>
  );
}

export default App;
