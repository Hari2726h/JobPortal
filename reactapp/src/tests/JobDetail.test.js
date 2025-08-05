import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import JobDetail from '../components/JobDetail';
import * as api from '../utils/api';

describe('JobDetail', () => {
  const sample = {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'New York, NY',
    type: 'Full-time',
    postedDate: '2023-10-15',
    description: 'Job desc...',
    skills: ['React', 'JS'],
    salaryRange: '$80k-$100k',
    applicationDeadline: '2023-11-15',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('shows loading state', () => {
    jest.spyOn(api, 'fetchJobById').mockReturnValue(new Promise(() => {}));
    render(<JobDetail jobId={1} onBack={jest.fn()} />);
    expect(screen.getByTestId('detail-loading')).toBeInTheDocument();
  });
  it('shows error on API fail', async () => {
    jest.spyOn(api, 'fetchJobById').mockRejectedValue({ response: { data: { message: 'Job not found' } } });
    render(<JobDetail jobId={1} onBack={jest.fn()} />);
    await screen.findByTestId('detail-error');
  });
  it('renders full job details', async () => {
    jest.spyOn(api, 'fetchJobById').mockResolvedValue(sample);
    render(<JobDetail jobId={1} onBack={jest.fn()} />);
    await screen.findByText('Frontend Developer');
    expect(screen.getByText('Job desc...')).toBeInTheDocument();
    expect(screen.getByText('$80k-$100k')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
  it('calls onBack when Back to Listings is clicked', async () => {
    jest.spyOn(api, 'fetchJobById').mockResolvedValue(sample);
    const onBack = jest.fn();
    render(<JobDetail jobId={1} onBack={onBack} />);
    await screen.findByText('Frontend Developer');
    fireEvent.click(screen.getByTestId('back-button'));
    expect(onBack).toHaveBeenCalled();
  });
});
