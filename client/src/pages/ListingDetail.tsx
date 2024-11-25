import * as React from "react";
import { useParams } from "react-router-dom";

const ListingDetails = () => {
  const { id } = useParams(); // Extract the ID from the URL

  // Mock data (replace with a dynamic API call later)
  const listings = [
    {
      id: "1",
      image: "https://via.placeholder.com/300",
      title: "1 house",
      price: "$750",
      tags: ["furnished", "utilities", "BackYard"],
      description: "A beautiful house with a backyard, perfect for families.",
    },
    {
      id: "2",
      image: "https://via.placeholder.com/300",
      title: "2 house",
      price: "$1230",
      tags: ["furnished", "utilities"],
      description: "A modern house with all the amenities included.",
    },
  ];

  // Find the specific listing by ID
  const listing = listings.find((item) => item.id === id);

  if (!listing) {
    return <div className="text-center py-5">Listing not found!</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={listing.image}
            alt={listing.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-5">{listing.title}</h1>
          <p className="text-muted">{listing.price}</p>
          <p>{listing.description}</p>
          <div className="d-flex flex-wrap gap-2 mt-3">
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
    </div>
  );
};

export default ListingDetails;
