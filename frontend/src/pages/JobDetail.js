import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getJob } from '../services/api';

export default function JobDetail() {
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchJob() {
            try {
                setLoading(true);
                setError('');

                const data = await getJob(id);
                setJob(data);
            } catch (err) {
                setError(err.message || 'Failed to load job');
            } finally {
                setLoading(false);
            }
        }

        fetchJob();
    }, [id]);

    if (loading) {
        return <p>Loading job...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!job) {
        return <p>Job not found.</p>;
    }

    return (
        <div>
            {/* TODO (Member C): design the job details page according to Figma. */}

            <h1>{job.title}</h1>
            <h3>{job.company}</h3>
            <p>Location: {job.location}</p>
            <p>{job.description}</p>

            {/* TODO (Member A): check the logged-in user's role.
                - If not logged in, show "Log in to apply".
                - If role === 'candidate', allow applying.
                - If role is employer or admin, hide the application form. */}

            {/* TODO (Member C + B): import and display <ApplicationForm />
                for logged-in candidates. */}
        </div>
    );
}