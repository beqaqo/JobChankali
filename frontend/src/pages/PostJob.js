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
            navigate(`/jobs`);

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
            <div className="auth-card auth-card--white">
                <img src="/icons/logo.svg" alt="JobChankali" className="post-job-logo" />
                <form onSubmit={handleSubmit}>
                    <input
                        className="input"
                        name="company"
                        type="text"
                        aria-label="Company name"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        required
                    />

                    <input
                        className="input"
                        name="title"
                        type="text"
                        aria-label="Position"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Position"
                        required
                    />

                    <input
                        className="input"
                        name="location"
                        type="text"
                        aria-label="Location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                    />

                    <textarea
                        className="input"
                        name="description"
                        aria-label="Description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />

                    <button type="submit" className="btn btn--primary" disabled={loading}>
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </form>

                {error && <p className="post-job-error">{error}</p>}
            </div>
        </div>
    );
}