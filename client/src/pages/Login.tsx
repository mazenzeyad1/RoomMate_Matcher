import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Login = () => {
  const navigation = useNavigate();
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user_name', 'user_avatar']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function createUserCookie() {
    setCookie("user_name", user_name, {path: '/', sameSite: 'lax'});
  }

  async function signUserIn() {
    setIsLoading(true);
    setError('');

    const task = {
      user_name: user_name,
      password: password,
    };

    if (task.user_name && task.password) {
      try {
        const res = await axios.get(`/users/${task.user_name}`);
        if (res.data) {
          if (task.password === res.data.password) {
            createUserCookie();
            navigation('/');
          } else {
            setError('Invalid password');
          }
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
        console.log(err);
      }
    } else {
      setError('Please fill in all fields');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if(cookies.user_name) {
      navigation('/');
    }
  }, [cookies.user_name, navigation]);

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-dark text-white text-center py-4 border-0">
                <h4 className="mb-0 fw-bold">Welcome Back</h4>
              </div>
              <div className="card-body p-5">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); signUserIn(); }}>
                  <div className="mb-4">
                    <label className="form-label">Username</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        value={user_name}
                        onChange={(e) => setUserName(e.target.value)}
                        data-testid="user-name-form-field"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        data-testid="password-form-field"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember"
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button
                    className="btn btn-dark w-100 mb-4"
                    type="submit"
                    disabled={isLoading}
                    data-testid="sign-in-button"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                  <div className="text-center">
                    <p className="mb-0 text-muted">
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-dark fw-bold text-decoration-none">
                        Sign up
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

export default Login;
