import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar: React.FC = () => {
  const [cookies, _, removeCookie] = useCookies(["user_name", "user_id"]);
  const navigate = useNavigate();

  const logOut = () => {
    removeCookie("user_name");
    removeCookie("user_id");
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Logo */}
      <a className="navbar-brand" href="/">
        ShareSpace
      </a>
      <div className="collapse navbar-collapse">
        {/* Left Aligned Links */}
        <ul className="navbar-nav">
          {!cookies.user_name && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  Sign up
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            </>
          )}
        </ul>

        {/* Right Aligned Profile Icon */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <img
              src="https://via.placeholder.com/30" // Placeholder profile picture
              alt="Profile"
              className="rounded-circle cursor-pointer"
              style={{ width: "30px", height: "30px" }}
              onClick={() => {
                if (cookies.user_name) {
                  navigate(`/profile/${cookies.user_id}`); // Go to user's specific profile
                } else {
                  navigate("/profile"); // Redirect to the general profile
                }
              }}
            />
          </li>
          {cookies.user_name && (
            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-decoration-none text-dark"
                onClick={logOut}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
