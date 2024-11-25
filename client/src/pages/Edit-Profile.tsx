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
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<IUser>({
    _id: "12345", // Simulated user ID
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "This is John's bio.",
    avatar: "https://via.placeholder.com/150",
    age: 25,
    number: "123-456-7890",
    preferences: ["Reading", "Traveling"], // Default selected preferences
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
  ]; // Options for user preferences

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

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Updated Profile Data:", formData); // Replace with actual API call
      setSaving(false);
      navigate("/profile"); // Redirect back to the profile page after saving
    } catch (err) {
      setError("Failed to save profile. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Edit Profile</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            disabled // Email is not editable
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="form-control"
            rows={3}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">
            Avatar URL
          </label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Preferences</label>
          <div>
            {availablePreferences.map((preference) => (
              <div className="form-check" key={preference}>
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
            ))}
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-3"
            onClick={() => navigate("/profile")} // Redirect back without saving
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
