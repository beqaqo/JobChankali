import { useEffect, useState } from 'react';

import { getJobs } from '../services/api';
import JobCard from '../components/JobCard';
import '../styles/JobsListing.css';

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
        return <p className="job-listing__message">Loading jobs...</p>;
    }

    if (error) {
        return (
            <p className="job-listing__message job-listing__message--error">
                {error}
            </p>
        );
    }

    if (jobs.length === 0) {
        return <p className="job-listing__message">No jobs available at the moment.</p>;
    }

    return (
        <div className="job-listing">
            {/* TODO (Member B - optional): implement job search/filtering. */}

            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}