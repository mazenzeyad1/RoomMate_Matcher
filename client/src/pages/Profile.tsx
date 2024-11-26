import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const user = id
    ? {
        name: "John Doe",
        email: "johndoe@example.com",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar: "https://via.placeholder.com/150",
        location: "Montreal, QC",
        joinDate: "January 2024"
      }
    : {
        name: "Guest User",
        email: "guest@example.com",
        bio: "Welcome to the profile page. Log in to access more features.",
        avatar: "https://via.placeholder.com/150",
        location: "Unknown",
        joinDate: "N/A"
      };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-dark text-white text-center py-4 border-0">
                <h3 className="mb-0">Profile</h3>
              </div>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="rounded-circle mb-4"
                      style={{ 
                        width: "150px", 
                        height: "150px", 
                        objectFit: "cover",
                        border: "4px solid white",
                        boxShadow: "0 0 20px rgba(0,0,0,0.1)"
                      }}
                    />
                    <button
                      className="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0"
                      style={{ width: "35px", height: "35px" }}
                      onClick={() => navigate("/edit-profile")}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                  <h3 className="fw-bold mb-1">{user.name}</h3>
                  <p className="text-muted mb-3">
                    <i className="bi bi-envelope me-2"></i>{user.email}
                  </p>
                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <span className="text-muted small">
                      <i className="bi bi-geo-alt me-1"></i>{user.location}
                    </span>
                    <span className="text-muted small">
                      <i className="bi bi-calendar3 me-1"></i>Joined {user.joinDate}
                    </span>
                  </div>
                  <div className="bg-light p-4 rounded-3 mb-4">
                    <p className="mb-0">{user.bio}</p>
                  </div>
                  <button
                    className="btn btn-dark px-5"
                    onClick={() => navigate("/edit-profile")}
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Profile
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

export default Profile;
