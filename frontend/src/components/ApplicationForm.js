import { useState } from 'react';

import { submitApplication } from '../services/api';

export default function ApplicationForm({ jobId }) {
    const [coverLetter, setCoverLetter] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');
            setSuccess('');

            await submitApplication({
                job_id: jobId,
                cover_letter: coverLetter
            });

            setSuccess('Application submitted successfully!');
            setCoverLetter('');

        } catch (err) {
            setError(err.message || 'Failed to submit application');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {/* TODO (Member C): build and style the form according to Figma. */}

            <h2>Apply for this job</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="coverLetter">Cover Letter</label>

                    <textarea
                        id="coverLetter"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Tell us why you are a good fit for this job..."
                        rows="5"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>

            {/* TODO (Member C): style success and error messages according to Figma. */}

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
}