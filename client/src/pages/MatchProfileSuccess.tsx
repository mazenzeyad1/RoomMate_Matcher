import { Link } from 'react-router-dom';

const MatchProfileSuccessPage = () => {
    return (
        <div className="min-vh-100 bg-light d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card border-0 shadow-lg text-center p-5">
                            <div className="mb-4">
                                <div className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-4" 
                                     style={{ width: "100px", height: "100px" }}>
                                    <i className="bi bi-check-lg text-success" style={{ fontSize: "3rem" }}></i>
                                </div>
                                <h1 className="display-5 fw-bold mb-3">Profile Created!</h1>
                                <p className="text-muted mb-4">
                                    Your match profile has been created successfully. You're now ready to find your perfect roommate!
                                </p>
                            </div>
                            <div className="d-grid gap-3 d-sm-flex justify-content-center">
                                <Link to="/" className="btn btn-dark px-5 py-3">
                                    <i className="bi bi-house me-2"></i>
                                    Browse Listings
                                </Link>
                                <Link to="/profile" className="btn btn-outline-dark px-5 py-3">
                                    <i className="bi bi-person me-2"></i>
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchProfileSuccessPage;
