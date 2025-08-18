import React, { useEffect, useState } from 'react';
import { BellFill } from 'react-bootstrap-icons';
import * as api from '../utils/api';

const Notifications = ({ companyId }) => {
    const [newAppsCount, setNewAppsCount] = useState(0);

    useEffect(() => {
        // If companyId is not available, do nothing
        if (!companyId) return;

        const fetchApplications = async () => {
            try {
                const applications = await api.getApplicationsByCompany(companyId);
                // Count only new applications
                const newApps = applications.filter(app => app.status === 'New');
                setNewAppsCount(newApps.length);
            } catch (err) {
                console.error('Error fetching applications:', err);
            }
        };

        // Initial fetch
        fetchApplications();

        // Poll every 30 seconds
        const interval = setInterval(fetchApplications, 30000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, [companyId]);

    return (
        <div style={{ position: 'relative', cursor: 'pointer' }}>
            <BellFill size={24} />
            {newAppsCount > 0 && (
                <span
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: 'red',
                        borderRadius: '50%',
                        padding: '2px 6px',
                        fontSize: '0.7rem',
                        color: 'white',
                    }}
                >
                    {newAppsCount}
                </span>
            )}
        </div>
    );
};

export default Notifications;
