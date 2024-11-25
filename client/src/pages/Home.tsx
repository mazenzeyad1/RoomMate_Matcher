import * as React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const listings = [
    {
      id: "1",
      image: "https://via.placeholder.com/300",
      title: "1 house",
      price: "$750",
      tags: ["furnished", "utilities", "BackYard"],
    },
    {
      id: "2",
      image: "https://via.placeholder.com/300",
      title: "2 house",
      price: "$1230",
      tags: ["furnished", "utilities"],
    },
  ];

  return (
    <div id="home" className="container text-center py-5">
      <h1 className="display-4 fw-bold mb-4">Welcome to HomeFinder</h1>
      <p className="lead mb-5">
        Find your perfect home today! Browse listings tailored to your needs.
      </p>

      {/* Listings Section */}
      <div className="row justify-content-center align-items-stretch g-4">
        {listings.map((listing) => (
          <div key={listing.id} className="col-md-4 col-lg-3 d-flex">
            {/* Wrap each card with a Link */}
            <Link to={`/listing/${listing.id}`} className="text-decoration-none">
              <div className="card shadow-sm w-100">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-start">
                  <h5 className="card-title fw-bold">{listing.title}</h5>
                  <p className="card-text text-muted mb-3">{listing.price}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {listing.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-secondary text-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
