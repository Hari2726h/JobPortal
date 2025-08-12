import React, { useState } from 'react';
import * as api from '../utils/api';

const JobSearch = ({ setJobs }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [empty, setEmpty] = useState(false);

    const handleSearch = (e) => {
        if (e) e.preventDefault();  // prevent page reload on form submit

        if (!query.trim()) return;
        setLoading(true);
        setError('');
        setEmpty(false);

        api.searchJobs(query)
            .then(results => {
                setJobs(results);
                if (results.length === 0) setEmpty(true);
            })
            .catch(() => {
                setError('Search failed. Please try again.');
                setJobs([]);
            })
            .finally(() => setLoading(false));
    };

    return (
        <form
            onSubmit={handleSearch}
            data-testid="job-search"
            style={{ display: 'flex', gap: '0.5rem' }}
        >
            <input
                data-testid="search-input"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search jobs"
                style={{
                    flex: 1,
                    maxWidth: '400px',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #ced4da',
                }}
            />
            <button
                type="submit"
                data-testid="search-button"
                disabled={loading}
                style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.25rem',
                    border: 'none',
                    backgroundColor: '#0d6efd',
                    color: 'white',
                }}
            >
                {loading ? 'Searching...' : 'Search'}
            </button>
            {error && (
                <div
                    data-testid="search-error"
                    style={{ color: 'red', marginTop: '0.5rem' }}
                >
                    {error}
                </div>
            )}
            {empty && (
                <div
                    data-testid="search-empty-message"
                    style={{ marginTop: '0.5rem', color: '#6c757d' }}
                >
                    No results found.
                </div>
            )}
        </form>
    );
};

export default JobSearch;
