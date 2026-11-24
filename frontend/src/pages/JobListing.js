import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getJobs } from '../services/api';
import JobCard from '../components/JobCard';
import '../styles/JobsListing.css';

export default function JobListing() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [searchParams] = useSearchParams();
    const search = searchParams.get('search')?.toLowerCase().trim() || '';

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

    const filteredJobs = jobs.filter((job) =>
        job.title?.toLowerCase().includes(search) ||
        job.company?.toLowerCase().includes(search)
    );

    if (filteredJobs.length === 0) {
        return (
            <p className="job-listing__message">
                No jobs found.
            </p>
        );
    }

    return (
        <div className="job-listing">
            {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onDeleted={(id) => setJobs((prev) => prev.filter((j) => j.id !== id))}/>
            ))}
        </div>
    );
}