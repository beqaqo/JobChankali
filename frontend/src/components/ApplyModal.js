import {useEffect, useState} from 'react';

import '../styles/ApplyModal.css';

export default function ApplyModal({job, onClose, onSubmit}) {
    const [coverLetter, setCoverLetter] = useState('');
    const [error, setError] = useState('');

    // Close the modal when the user presses the Escape key
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup: remove the listener when the modal disappears
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    function handleSubmit(event) {
        event.preventDefault(); // stop the page from reloading

        // The label in Figma has a red * so the field is required
        if (coverLetter.trim() === '') {
            setError('Please write a cover letter before submitting.');
            return;
        }

        onSubmit(coverLetter);
    }

    function handleChange(event) {
        setCoverLetter(event.target.value);
        setError(''); // hide the error as soon as the user starts typing
    }

    return (
        // The dark background. Clicking it closes the modal.
        <div className="apply-modal__overlay" onClick={onClose}>
            {/* The white box. stopPropagation = clicks inside do NOT close it. */}
            <div
                className="apply-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="apply-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Header: logo + company + title + location */}
                <div className="apply-modal__header">
                    <div className="apply-modal__logo">
                        {job.logo ? (
                            <img src={job.logo} alt={job.company}/>
                        ) : (
                            <span>{job.company?.charAt(0)}</span>
                        )}
                    </div>

                    <div>
                        <h2 id="apply-modal-title" className="apply-modal__company">
                            {job.company}
                        </h2>
                        <p className="apply-modal__title">{job.title}</p>
                        <p className="apply-modal__location">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#777">
                                <path
                                    d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
                            </svg>
                            {job.location}
                        </p>
                    </div>
                </div>

                {/* The form */}
                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="cover-letter" className="apply-modal__label">
                        Cover Letter <span className="apply-modal__required">*</span>
                    </label>

                    <textarea
                        id="cover-letter"
                        className="apply-modal__textarea"
                        placeholder="Tell us why you’re a great fit..."
                        value={coverLetter}
                        onChange={handleChange}
                        autoFocus
                    />

                    {error && <p className="apply-modal__error">{error}</p>}

                    <div className="apply-modal__actions">
                        <button type="button" className="btn btn--grey" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn--orange">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}