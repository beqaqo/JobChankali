import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { deleteJob } from '../services/api';
import ApplyModal from './ApplyModal';
import '../styles/JobCard.css';

export default function JobCard({ job, onDeleted }) {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const [isOpen, setIsOpen] = useState(false);
    // remembers whether the modal is showing (true) or hidden (false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    function toggleCard() {
        setIsOpen(!isOpen);
    }

    // "Apply now" opens the modal instead of navigating away
    function handleApply() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    // runs when the user submits the cover letter
    function handleSubmitApplication(coverLetter) {
        // TODO: send this to your backend, e.g.
        // await applyToJob(job.id, coverLetter);
        console.log('Applying to', job.title, 'with cover letter:', coverLetter);

        setIsModalOpen(false);
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

                {isAdmin && (
                    <button
                        type="button"
                        className="job-card__delete"
                        aria-label="Delete job"
                        onClick={async () => {
                            try {
                                await deleteJob(job.id);
                                onDeleted?.(job.id);
                            } catch (err) {
                                alert(err.message || 'Failed to delete job');
                            }
                        }}
                    >
                        <img src="/icons/delete.svg" alt="" width="22" height="22" />
                    </button>
                )}

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

            {/* Job description and Apply button.
                Always rendered so CSS can animate it open and closed. */}
            <div
                className={`job-card__collapse ${isOpen ? 'job-card__collapse--open' : ''}`}
                aria-hidden={!isOpen}
            >
                <div className="job-card__collapse-inner">
                    <div className="job-card__details">
                        <p>{job.description}</p>

                        <button
                            type="button"
                            className="job-card__apply"
                            onClick={handleApply}
                            tabIndex={isOpen ? 0 : -1}
                        >
                            Apply now
                        </button>
                    </div>
                </div>
            </div>

            {/* only draw the modal when isModalOpen is true */}
            {isModalOpen && (
                <ApplyModal
                    job={job}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitApplication}
                />
            )}
        </div>
    );
}