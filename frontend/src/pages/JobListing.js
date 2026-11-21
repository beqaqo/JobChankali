import { useEffect, useState } from 'react';

import { getJobs } from '../services/api';

export default function JobListing() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true);
                setError('');

                const data = await getJobs();
                setJobs(data);
            } catch (err) {
                setError(err.message || 'Failed to load jobs');
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    if (loading) {
        return <p>Loading jobs...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (jobs.length === 0) {
        return <p>No jobs available at the moment.</p>;
    }

    return (
        <div>
            {/* TODO (Member C): design the job listing page according to Figma. */}

            <h1>Available Jobs</h1>

            {/* TODO (Member C): replace this list with <JobCard /> components. */}

            {jobs.map((job) => (
                <div key={job.id}>
                    <h2>{job.title}</h2>
                    <h3>{job.company}</h3>
                    <p>{job.location}</p>
                    <p>{job.description}</p>
                </div>
            ))}

            {/* TODO (Member B - optional): implement job search/filtering. */}
        </div>
    );
}