import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import JobListing from '../components/JobListing';
import * as api from '../utils/api';

describe('JobListing', () => {
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      type: 'Full-time',
      postedDate: '2023-10-15',
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Cloud Apex',
      location: 'Remote',
      type: 'Part-time',
      postedDate: '2023-11-02',
    },
  ];
  let setJobs;
  let onSelectJob;

  beforeEach(() => {
    setJobs = jest.fn();
    onSelectJob = jest.fn();
  });

  it('renders loading indicator', () => {
    jest.spyOn(api, 'fetchJobs').mockReturnValue(new Promise(() => {}));
    render(<JobListing setJobs={setJobs} jobs={[]} onSelectJob={onSelectJob} />);
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders error on API failure', async () => {
    jest.spyOn(api, 'fetchJobs').mockRejectedValue(new Error('fail'));
    render(<JobListing setJobs={setJobs} jobs={[]} onSelectJob={onSelectJob} />);
    await screen.findByTestId('error-message');
  });

  it('renders no jobs message', async () => {
    jest.spyOn(api, 'fetchJobs').mockResolvedValue([]);
    render(<JobListing setJobs={setJobs} jobs={[]} onSelectJob={onSelectJob} />);
    await screen.findByTestId('no-jobs-message');
  });

  it('renders job list', async () => {
    jest.spyOn(api, 'fetchJobs').mockResolvedValue(jobs);
    render(<JobListing setJobs={setJobs} jobs={[]} onSelectJob={onSelectJob} />);
    await waitFor(() => expect(setJobs).toHaveBeenCalledWith(jobs));
  });

  it('calls onSelectJob when job is clicked', async () => {
    jest.spyOn(api, 'fetchJobs').mockResolvedValue(jobs);
    render(<JobListing setJobs={setJobs} jobs={[]} onSelectJob={onSelectJob} />);
    // Wait for the jobs to be set after fetch resolves
    await waitFor(() => screen.getByTestId('job-item-1'));
    fireEvent.click(screen.getByTestId('job-item-1'));
    expect(onSelectJob).toHaveBeenCalledWith(1);
  });
});
