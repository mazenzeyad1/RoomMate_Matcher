import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/listings/ListingCard";
import axios from "axios";

const Home = () => {
  const [listings, setListings] = useState([]);

  async function getListings() {
    const response = await axios.get('/listings')

    if(!response.data) {
      //TODO: Change this to update something on the screen
      window.alert("Error while getting listings")
      return
    }

    setListings(response.data)
  }

  useEffect(() => {
    getListings()
    return
  }, [])

  return (
    <div id="home" className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <h1 className="display-4 fw-bold mb-4" style={{ color: "#2c3e50" }}>Welcome to ShareSpace</h1>
          <p className="lead text-muted mb-5">
            Find your perfect home today! Browse listings tailored to your needs.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {listings && listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing._id} className="col-md-4 col-lg-3">
              <Link to={`/listings/${listing._id}`} className="text-decoration-none d-block h-100">
                <ListingCard listing={listing} />
              </Link>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <h2 className="text-muted">No listings found...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
