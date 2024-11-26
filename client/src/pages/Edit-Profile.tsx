import * as React from "react";
import { useNavigate } from "react-router-dom";

interface IUser {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  age?: number;
  number?: string;
  preferences?: string[];
  location?: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<IUser>({
    _id: "12345",
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "This is John's bio.",
    avatar: "https://via.placeholder.com/150",
    age: 25,
    number: "123-456-7890",
    preferences: ["Reading", "Traveling"],
    location: "Montreal, QC"
  });
  const [saving, setSaving] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const availablePreferences = [
    "Reading",
    "Traveling",
    "Sports",
    "Music",
    "Cooking",
    "Gaming",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (preference: string) => {
    setFormData((prevData) => {
      const { preferences = [] } = prevData;
      if (preferences.includes(preference)) {
        return {
          ...prevData,
          preferences: preferences.filter((pref) => pref !== preference),
        };
      } else {
        return {
          ...prevData,
          preferences: [...preferences, preference],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Updated Profile Data:", formData);
      setSaving(false);
      navigate("/profile");
    } catch (err) {
      setError("Failed to save profile. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-dark text-white text-center py-4 border-0">
                <h3 className="mb-0">Edit Profile</h3>
              </div>
              <div className="card-body p-5">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="text-center mb-4">
                    <div className="position-relative d-inline-block">
                      <img
                        src={formData.avatar}
                        alt="Profile"
                        className="rounded-circle mb-3"
                        style={{ 
                          width: "120px", 
                          height: "120px", 
                          objectFit: "cover",
                          border: "4px solid white",
                          boxShadow: "0 0 20px rgba(0,0,0,0.1)"
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <i className="bi bi-camera"></i>
                      </button>
                    </div>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Age</label>
                        <input
                          type="number"
                          name="age"
                          className="form-control"
                          value={formData.age || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          name="number"
                          className="form-control"
                          value={formData.number || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          name="location"
                          className="form-control"
                          value={formData.location || ""}
                          onChange={handleChange}
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label">Bio</label>
                        <textarea
                          name="bio"
                          className="form-control"
                          value={formData.bio}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell us about yourself..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label d-block mb-3">Preferences</label>
                      <div className="row g-3">
                        {availablePreferences.map((preference) => (
                          <div className="col-md-4" key={preference}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={preference}
                                checked={formData.preferences?.includes(preference) || false}
                                onChange={() => handleCheckboxChange(preference)}
                              />
                              <label className="form-check-label" htmlFor={preference}>
                                {preference}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-3 mt-5">
                    <button
                      type="button"
                      className="btn btn-light px-4"
                      onClick={() => navigate("/profile")}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-dark px-4"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
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

export default EditProfile;
