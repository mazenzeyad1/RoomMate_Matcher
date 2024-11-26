import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const SignUp = () => {
  const navigation = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [user_name, setUserName] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function createUserCookie() {
    setCookie("user_name", user_name, {path: '/', sameSite: 'lax'});
  }

  async function createNewUser() {
    setIsLoading(true);
    setError('');
    
    const task = {
      email,
      password,
      first_name,
      last_name,
      user_name,
      phone_no,
    };

    if (
      task.email &&
      task.password &&
      task.first_name &&
      task.last_name &&
      task.user_name &&
      task.phone_no
    ) {
      try {
        const res = await axios.post('/users', task);
        if (res.data) {
          createUserCookie();
          navigation('/');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
        console.log(err);
      }
    } else {
      setError('Please fill in all fields');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if(cookies.user_name) {
      navigation("/");
    }
  }, [cookies.user_name, navigation]);
  
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-dark text-white text-center py-4 border-0">
                <h4 className="mb-0 fw-bold">Create Your Account</h4>
              </div>
              <div className="card-body p-5">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); createNewUser(); }}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="bi bi-person"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter first name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="bi bi-person"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter last name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="bi bi-envelope"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Username</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="bi bi-at"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Choose a username"
                            value={user_name}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="bi bi-lock"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="bi bi-phone"></i>
                          </span>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter phone number"
                            value={phone_no}
                            onChange={(e) => setPhoneNo(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-dark w-100 mt-4 mb-3"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                  <div className="text-center">
                    <p className="mb-0 text-muted">
                      Already have an account?{' '}
                      <Link to="/login" className="text-dark fw-bold text-decoration-none">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
