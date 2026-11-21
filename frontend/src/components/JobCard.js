
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/JobCard.css';

export default function JobCard({ job }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function toggleCard() {
        setIsOpen(!isOpen);
    }

    function handleApply() {
        navigate('/post-job', { state: { job } });
    }

    return (
        <div className="job-card-wrapper">
            <div className="job-card">
                {/* Company logo */}
                <div
                    className="job-card__logo"
                    style={{ backgroundColor: '#e0e0e0' }}
                >
                    {job.logo ? (
                        <img src={job.logo} alt={job.company} />
                    ) : (
                        <span>{job.company?.charAt(0)}</span>
                    )}
                </div>

                <div className="job-card__info">
                    <h2 className="job-card__company">
                        {job.company}
                    </h2>

                    <p className="job-card__title">
                        {job.title}
                    </p>

                    <p className="job-card__location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#777">
                            <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                        </svg>
                        {job.location}
                    </p>
                </div>

                {/* Expand/collapse button */}
                <button
                    type="button"
                    className={`job-card__arrow ${isOpen ? 'job-card__arrow--open' : ''}`}
                    onClick={toggleCard}
                    aria-label={isOpen ? 'Hide job details' : 'Show job details'}
                    aria-expanded={isOpen}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#777">
                        <path d="M6 3l15 9-15 9z" />
                    </svg>
                </button>
            </div>

            {/* Job description and Apply button */}
            {isOpen && (
                <div className="job-card__details">
                    <p>{job.description}</p>

                    <button
                        type="button"
                        className="job-card__apply"
                        onClick={handleApply}
                    >
                        Apply now
                    </button>
                </div>
            )}
        </div>
    );
}
