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
    <div id="home" className="container text-center py-5">
      <h1 className="display-4 fw-bold mb-4">Welcome to ShareSpace</h1>
      <p className="lead mb-5">
        Find your perfect home today! Browse listings tailored to your needs.
      </p>

      {/* Listings Section */}

      <div className="row justify-content-center align-items-stretch g-4">
        {listings && listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing._id} className="col-md-4 col-lg-3 d-flex">
              {/* Wrap each card with a Link */}
              <Link to={`/listings/${listing._id}`} className="text-decoration-none">
                <ListingCard listing={listing} />
              </Link>
            </div>
          ))) : (
            <div className='col-md-4 col-lg-3 d-flex'>
              <h2>No listings found...</h2>
            </div>
          )}
        
      </div>
    </div>
  );
};

export default Home;
