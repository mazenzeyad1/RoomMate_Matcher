import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const ListingDetails = () => {
  const { id } = useParams(); // Extract the ID from the URL
  //Typescript complains when we pass it an empty object because it doesn't know if the field exists
  const [listing, setListing] = useState({
    image: null,
    title: "Not found",
    price_per_month: 0,
    tags: ["none"],
    description: "empty",
    contact_info: {
      first_name: "John",
      last_name: "Doe",
      phone_number: "555-555-0123",
      email: "test@example.com"
    }
  })

  async function getListing() {
    const response = await axios.get(`/listings/${id}`)

    if(!response.data) {
      //TODO: change this to update something on the screen
      window.alert("Error while fetching the listing")
      return
    }

    setListing(response.data)
  }

  useEffect(() => {
    getListing()

    return
  }, [])

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
          <p className="text-muted">${listing.price_per_month} per month</p>
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
      <div className="row">
        <div className="col-md-6">
          <h1>Listed by:</h1>
          <p>{listing.contact_info.first_name} {listing.contact_info.last_name}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h1>Contact information:</h1>
          <p>Phone number: {listing.contact_info.phone_number}</p>
          <p>Email: {listing.contact_info.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
