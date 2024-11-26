import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const MatchProfileCreator = () => {
    const navigation = useNavigate();
    const [cookies] = useCookies();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        cleanlinessLevel: 0,
        schedule: '',
        budget: '',
        preferredChores: '',
        socializingLevel: 0,
        preferences: [] as string[], // Added preferences field
    });

    const availablePreferences = [
        'Reading',
        'Traveling',
        'Sports',
        'Music',
        'Cooking',
        'Gaming',
    ]; // Define the available preferences

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (preference: string) => {
        setFormData((prevData) => {
            const { preferences } = prevData;
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

    async function createNewMatchProfile() {
        setIsLoading(true);
        setError(null);

        try {
            const task = {
                cleanliness_level: formData.cleanlinessLevel,
                schedule: formData.schedule,
                budget: parseInt(formData.budget),
                preferred_chores: formData.preferredChores,
                socializing_level: formData.socializingLevel,
                preferences: formData.preferences, // Include preferences in the payload
                user_name: cookies.user_name,
            };

            // Validate input
            if (!task.cleanliness_level) throw new Error('Please select your cleanliness level');
            if (!task.schedule) throw new Error('Please enter your schedule');
            if (!task.budget) throw new Error('Please enter your budget');
            if (!task.preferred_chores) throw new Error('Please enter your preferred chores');
            if (!task.socializing_level) throw new Error('Please select your socializing level');

            const response = await axios.post('/match-profile', task);
            if (response.data) {
                navigation('/profile-created');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to create profile. Please try again.');
            window.scrollTo(0, 0);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!cookies.user_name) {
            navigation('/');
        }
    }, [cookies.user_name, navigation]);

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-lg">
                            <div className="card-header bg-dark text-white text-center py-4 border-0">
                                <h2 className="mb-0">Create Your Match Profile</h2>
                            </div>
                            <div className="card-body p-4 p-lg-5">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        {error}
                                    </div>
                                )}

                                <div className="text-center mb-5">
                                    <h4 className="text-muted">Help us find your perfect roommate match!</h4>
                                    <p className="text-muted">Answer a few questions about your lifestyle and preferences.</p>
                                </div>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        createNewMatchProfile();
                                    }}
                                >
                                    {/* Cleanliness Level */}
                                    <div className="mb-5">
                                        <label className="form-label h5 mb-4">How often do you like to clean?</label>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-muted small">On a schedule</span>
                                            <span className="text-muted small">Every day</span>
                                        </div>
                                        <div className="btn-group w-100" role="group">
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <React.Fragment key={value}>
                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="cleanlinessLevel"
                                                        id={`cleanliness${value}`}
                                                        value={value}
                                                        checked={formData.cleanlinessLevel === value}
                                                        onChange={(e) =>
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                cleanlinessLevel: parseInt(e.target.value),
                                                            }))
                                                        }
                                                    />
                                                    <label
                                                        className="btn btn-outline-dark"
                                                        htmlFor={`cleanliness${value}`}
                                                    >
                                                        {value}
                                                    </label>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Socializing Level */}
                                    <div className="mb-5">
                                        <label className="form-label h5 mb-4">How social are you?</label>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-muted small">I like to keep to myself</span>
                                            <span className="text-muted small">Very social</span>
                                        </div>
                                        <div className="btn-group w-100" role="group">
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <React.Fragment key={value}>
                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="socializingLevel"
                                                        id={`social${value}`}
                                                        value={value}
                                                        checked={formData.socializingLevel === value}
                                                        onChange={(e) =>
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                socializingLevel: parseInt(e.target.value),
                                                            }))
                                                        }
                                                    />
                                                    <label
                                                        className="btn btn-outline-dark"
                                                        htmlFor={`social${value}`}
                                                    >
                                                        {value}
                                                    </label>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Budget and Schedule */}
                                    <div className="row g-4 mb-4">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label h5">Maximum Budget</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white">$</span>
                                                    <input
                                                        type="number"
                                                        name="budget"
                                                        className="form-control"
                                                        placeholder="Enter your max budget"
                                                        value={formData.budget}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label h5">Schedule</label>
                                                <input
                                                    type="text"
                                                    name="schedule"
                                                    className="form-control"
                                                    placeholder="e.g., Night owl, Early bird"
                                                    value={formData.schedule}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preferred Chores */}
                                    <div className="form-group mb-5">
                                        <label className="form-label h5">Preferred Chores</label>
                                        <textarea
                                            name="preferredChores"
                                            className="form-control"
                                            rows={3}
                                            placeholder="List the household chores you prefer doing..."
                                            value={formData.preferredChores}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    preferredChores: e.target.value,
                                                }))
                                            }
                                        ></textarea>
                                    </div>

                                    {/* Preferences */}
                                    <div className="form-group mb-5">
                                        <label className="form-label h5">Preferences</label>
                                        <div className="row g-3">
                                            {availablePreferences.map((preference) => (
                                                <div className="col-md-4" key={preference}>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={preference}
                                                            checked={formData.preferences.includes(preference)}
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

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-dark w-100 py-3"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                Creating Profile...
                                            </>
                                        ) : (
                                            'Create Match Profile'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchProfileCreator;
