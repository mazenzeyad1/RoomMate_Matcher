import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const CreateListingPage = () => {
    const oneMegabyteAsBits = 1048576;
    const fiveMegabytesAsBits = oneMegabyteAsBits * 5;
    const navigation = useNavigate();
    const [cookies, setCookies] = useCookies();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pricePerMonth: '',
        numberOfRoomsAvailable: '',
        address: '',
        image: '',
        tags: [] as string[],
        currentTag: ''
    });

    const [userInfo, setUserInfo] = useState({
        email: "test",
        phone_number: "555-555-0123",
        first_name: "John",
        last_name: "Doe"
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    async function createNewListing() {
        setIsLoading(true);
        setError(null);

        const contactInfo = {
            email: userInfo.email,
            phone_number: userInfo.phone_number,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name
        };

        const task = {
            associated_user: cookies.user_name,
            number_of_rooms_available: parseInt(formData.numberOfRoomsAvailable),
            address: formData.address,
            contact_info: contactInfo,
            tags: formData.tags,
            description: formData.description,
            price_per_month: parseInt(formData.pricePerMonth),
            title: formData.title,
            image: formData.image,
        };

        try {
            if (!task.title) throw new Error("Please enter a title");
            if (!task.description) throw new Error("Please enter a description");
            if (!task.price_per_month) throw new Error("Please enter a price");
            if (!task.number_of_rooms_available) throw new Error("Please enter number of rooms");
            if (!task.address) throw new Error("Please enter an address");
            if (!task.image) throw new Error("Please upload an image");

            const response = await axios.post('/listings', task);
            if (response.data) {
                navigation('/create-listing-success');
            }
        } catch (err: any) {
            setError(err.message || "Failed to create listing. Please try again.");
            window.scrollTo(0, 0);
        } finally {
            setIsLoading(false);
        }
    }

    async function getUserInfo() {
        try {
            const response = await axios.get(`/users/${cookies.user_name}`);
            if (response.data) {
                setUserInfo({
                    email: response.data.email,
                    phone_number: response.data.phone_no,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name
                });
            }
        } catch (err) {
            setError("Failed to load user information");
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > fiveMegabytesAsBits) {
            setError("Image must be less than 5MB");
            return;
        }

        try {
            const base64 = await convertImageToBase64(file);
            setFormData(prev => ({ ...prev, image: base64 }));
            setPreviewImage(URL.createObjectURL(file));
        } catch (err) {
            setError("Failed to process image");
        }
    };

    const convertImageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleAddTag = () => {
        if (formData.currentTag.trim()) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, prev.currentTag.trim()],
                currentTag: ''
            }));
        }
    };

    const handleRemoveTag = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (!cookies.user_name) {
            navigation('/');
            return;
        }
        getUserInfo();
    }, [cookies.user_name]);

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-lg">
                            <div className="card-header bg-dark text-white text-center py-4 border-0">
                                <h2 className="mb-0">Create Your Listing</h2>
                            </div>
                            <div className="card-body p-4 p-lg-5">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={(e) => { e.preventDefault(); createNewListing(); }}>
                                    <div className="row g-4">
                                        {/* Image Upload Section */}
                                        <div className="col-12 text-center mb-4">
                                            <div className="position-relative d-inline-block">
                                                {previewImage ? (
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="rounded-3 mb-3"
                                                        style={{ 
                                                            maxWidth: '100%', 
                                                            maxHeight: '300px', 
                                                            objectFit: 'cover' 
                                                        }}
                                                    />
                                                ) : (
                                                    <div 
                                                        className="rounded-3 bg-light d-flex align-items-center justify-content-center mb-3"
                                                        style={{ width: '100%', height: '300px' }}
                                                    >
                                                        <div className="text-center text-muted">
                                                            <i className="bi bi-image display-4"></i>
                                                            <p className="mt-2">Upload an image of your space</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    id="image"
                                                    className="d-none"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                                <label 
                                                    htmlFor="image" 
                                                    className="btn btn-dark position-absolute bottom-0 end-0 m-3"
                                                >
                                                    <i className="bi bi-camera me-2"></i>
                                                    Upload Image
                                                </label>
                                            </div>
                                            <small className="text-muted d-block">Maximum file size: 5MB</small>
                                        </div>

                                        {/* Basic Information */}
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label className="form-label">Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    className="form-control"
                                                    placeholder="Give your listing a catchy title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-4">
                                                <label className="form-label">Price per Month ($)</label>
                                                <input
                                                    type="number"
                                                    name="pricePerMonth"
                                                    className="form-control"
                                                    placeholder="Enter price"
                                                    value={formData.pricePerMonth}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-4">
                                                <label className="form-label">Number of Rooms</label>
                                                <input
                                                    type="number"
                                                    name="numberOfRoomsAvailable"
                                                    className="form-control"
                                                    placeholder="Enter number of rooms"
                                                    value={formData.numberOfRoomsAvailable}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label className="form-label">Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    className="form-control"
                                                    placeholder="Enter the full address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label className="form-label">Description</label>
                                                <textarea
                                                    name="description"
                                                    className="form-control"
                                                    rows={4}
                                                    placeholder="Describe your space..."
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                ></textarea>
                                            </div>
                                        </div>

                                        {/* Tags Section */}
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label className="form-label">Tags</label>
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="text"
                                                        name="currentTag"
                                                        className="form-control"
                                                        placeholder="Add tags (e.g., furnished, pets allowed)"
                                                        value={formData.currentTag}
                                                        onChange={handleInputChange}
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                handleAddTag();
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={handleAddTag}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {formData.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="badge bg-light text-dark border"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleRemoveTag(index)}
                                                        >
                                                            {tag}
                                                            <i className="bi bi-x ms-2"></i>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Information Preview */}
                                        <div className="col-12">
                                            <div className="bg-light rounded-3 p-4 mb-4">
                                                <h5 className="mb-3">Contact Information Preview</h5>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="mb-2">
                                                            <i className="bi bi-person me-2"></i>
                                                            {userInfo.first_name} {userInfo.last_name}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="mb-2">
                                                            <i className="bi bi-telephone me-2"></i>
                                                            {userInfo.phone_number}
                                                        </p>
                                                    </div>
                                                    <div className="col-12">
                                                        <p className="mb-0">
                                                            <i className="bi bi-envelope me-2"></i>
                                                            {userInfo.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                className="btn btn-dark w-100 py-3"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Creating Listing...
                                                    </>
                                                ) : (
                                                    'Create Listing'
                                                )}
                                            </button>
                                        </div>
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

export default CreateListingPage;
