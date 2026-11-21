import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createJob } from '../services/api';
import '../styles/PostJob.css';

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
        <div className="post-job">
            <div className="post-job-card">
                {/* Logo is at public/logo.png */}
                <img src="/logo.png" alt="JobChankali" className="post-job-logo" />

                <form onSubmit={handleSubmit}>
                    <input
                        name="company"
                        type="text"
                        aria-label="Company name"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        required
                    />

                    {/* "Position" in the design is the job title in the backend */}
                    <input
                        name="title"
                        type="text"
                        aria-label="Position"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Position"
                        required
                    />

                    <input
                        name="location"
                        type="text"
                        aria-label="Location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                    />

                    <textarea
                        name="description"
                        aria-label="Description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />

                    <button type="submit" className="post-button" disabled={loading}>
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </form>

                {error && <p className="post-job-error">{error}</p>}
            </div>

            {/* TODO (Member A): ensure only employers and admins can access this page.
                This should be handled through ProtectedRoute in App.js. */}
        </div>
    );
}