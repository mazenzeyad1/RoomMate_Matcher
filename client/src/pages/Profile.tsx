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
      }
    : {
        name: "Guest User",
        email: "guest@example.com",
        bio: "Welcome to the profile page. Log in to access more features.",
        avatar: "https://via.placeholder.com/150",
      };

  return (
    <div className="container py-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="rounded-circle mb-3"
            style={{ width: "150px", height: "150px" }}
          />
          <h3 className="card-title">{user.name}</h3>
          <p className="card-text text-muted">{user.email}</p>
          <p>{user.bio}</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
