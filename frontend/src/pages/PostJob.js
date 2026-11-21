import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createJob } from '../services/api';

export default function PostJob() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            // Send job information to the backend
            const data = await createJob(formData);
            // Redirect to the newly created job
            navigate(`/jobs/${data.id}`);

        } catch (err) {
            setError(err.message || 'Failed to create job');
        } finally {
            setLoading(false);
        }
    }

    // Update form data when user types
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <div>
            {/* TODO (Member C): design the form according to Figma. */}

            <h1>Post a Job</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="title">Job Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Python Developer"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="company">Company</label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="location">Location</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Tbilisi"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the job..."
                        rows="6"
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Job'}
                </button>

            </form>

            {/* TODO (Member C): style error messages according to Figma. */}

            {error && <p>{error}</p>}

            {/* TODO (Member A): ensure only employers and admins can access this page.
                This should be handled through ProtectedRoute in App.js. */}
        </div>
    );
}