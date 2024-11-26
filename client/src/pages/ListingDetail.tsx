import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const ListingDetails = () => {
  const { id } = useParams();
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
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getListing() {
    try {
      const response = await axios.get(`/listings/${id}`);
      if (response.data) {
        setListing(response.data);
      } else {
        setError("Listing not found");
      }
    } catch (err) {
      setError("Error loading listing");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getListing();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <i className="bi bi-exclamation-circle display-1 text-muted mb-3"></i>
          <h2 className="text-muted">{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="card border-0 shadow-lg">
          <div className="row g-0">
            <div className="col-lg-7">
              <div className="position-relative h-100">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-100 h-100"
                  style={{ objectFit: "cover", minHeight: "400px" }}
                />
                <div className="position-absolute top-0 end-0 m-3">
                  <div className="badge bg-dark fs-5 px-3 py-2">
                    ${listing.price_per_month}
                    <small className="d-block opacity-75">per month</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card-body p-4 p-lg-5">
                <h1 className="display-6 fw-bold mb-4">{listing.title}</h1>
                
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {listing.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <h5 className="text-dark mb-3">Description</h5>
                  <p className="text-muted">{listing.description}</p>
                </div>

                <hr className="my-4" />

                <div className="mb-4">
                  <h5 className="text-dark mb-3">Listed by</h5>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center me-3" 
                         style={{ width: "50px", height: "50px" }}>
                      <i className="bi bi-person-fill fs-4"></i>
                    </div>
                    <div>
                      <h6 className="mb-1">{listing.contact_info.first_name} {listing.contact_info.last_name}</h6>
                      <p className="text-muted small mb-0">Property Owner</p>
                    </div>
                  </div>
                </div>

                <div className="bg-light rounded-3 p-4">
                  <h5 className="text-dark mb-3">Contact Information</h5>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-telephone me-2 text-dark"></i>
                      <a href={`tel:${listing.contact_info.phone_number}`} 
                         className="text-decoration-none text-dark">
                        {listing.contact_info.phone_number}
                      </a>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-envelope me-2 text-dark"></i>
                      <a href={`mailto:${listing.contact_info.email}`}
                         className="text-decoration-none text-dark">
                        {listing.contact_info.email}
                      </a>
                    </div>
                  </div>
                  <button className="btn btn-dark w-100">
                    <i className="bi bi-chat-dots me-2"></i>
                    Contact Owner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
