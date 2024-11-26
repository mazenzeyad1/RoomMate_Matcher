import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Profile: React.FC = () => {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "John",
    last_name: "Doe",
    email: "test@example.com",
    avatar: "https://via.placeholder.com/150",
    phone_number: "(555) 555-0123"
  })
  
  async function getUserInfo() {
    try {
        const response = await axios.get(`/users/${cookies.user_name}`);
        if (response.data) {
            console.log(response.data)
            setUser({
                email: response.data.email,
                phone_number: response.data.phone_no,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                avatar: response.data.avatar
            });
        }
      } catch (err) {}
  }

  useEffect(() => {
    if (!cookies.user_name) {
      navigate('/');
      return;
    }
    getUserInfo();
  }, [cookies.user_name])

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
                  <h3 className="fw-bold mb-1">{user.first_name} {user.last_name}</h3>
                  <p className="text-muted mb-3">
                    <i className="bi bi-envelope me-2"></i>{user.email}
                  </p>
                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <span className="text-muted small">
                      <i className="bi bi-phone me-1"></i>{user.phone_number}
                    </span>
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
