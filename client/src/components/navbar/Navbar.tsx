import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios'
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [cookies, _, removeCookie] = useCookies(["user_name"]);
  const [avatar, setAvatar] = useState('')
  const navigate = useNavigate();

  const logOut = () => {
    removeCookie("user_name");
    navigate("/");
  };

  async function getAvatar() {
    try {
      const res = await axios.get(`/users/${cookies.user_name}`)

      if(res.data) {
        setAvatar(res.data.avatar)
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(cookies.user_name) {
      getAvatar()
    }
  }, [cookies.user_name])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#1a2634' }}>
      <div className="container py-2">
        {/* Logo */}
        <Link className="navbar-brand fs-4 fw-bold" to="/">
          ShareSpace
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Left Aligned Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {cookies.user_name ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/create-listing">
                    <i className="bi bi-plus-lg me-2"></i>
                    Create Listing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/match-profile-creator">
                    <i className="bi bi-people me-2"></i>
                    Match Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/signup">
                    <i className="bi bi-person-plus me-2"></i>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/login">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right Aligned Profile Section */}
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {cookies.user_name && (
              <>
                <li className="nav-item">
                  <img
                    src={avatar}
                    alt="Profile"
                    className="rounded-circle shadow-sm"
                    style={{
                      width: "38px",
                      height: "38px",
                      cursor: "pointer",
                      border: "2px solid #fff",
                    }}
                    onClick={() => {
                      navigate(`/profile`);
                    }}
                  />
                </li>
                <li className="nav-item ms-3">
                  <button
                    className="btn btn-outline-light rounded-pill px-4"
                    onClick={logOut}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
