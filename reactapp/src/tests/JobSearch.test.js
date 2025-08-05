import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobSearch from '../components/JobSearch';
import * as api from '../utils/api';

describe('JobSearch', () => {
  let setJobs;
  beforeEach(() => {
    setJobs = jest.fn();
  });

  it('renders input and search button', () => {
    render(<JobSearch setJobs={setJobs} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('calls setJobs on successful search', async () => {
    jest.spyOn(api, 'searchJobs').mockResolvedValue([
      { id: 77, title: 'Java Developer', company: 'Acme', location: 'NY', type: 'Full-time', postedDate: '2023-01-01' }
    ]);
    render(<JobSearch setJobs={setJobs} />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'java' } });
    fireEvent.click(screen.getByTestId('search-button'));
    await waitFor(() => expect(setJobs).toHaveBeenCalledWith(expect.any(Array)));
  });

  it('shows error on API failure', async () => {
    jest.spyOn(api, 'searchJobs').mockRejectedValue(new Error('fail'));
    render(<JobSearch setJobs={setJobs} />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'fail' } });
    fireEvent.click(screen.getByTestId('search-button'));
    await screen.findByTestId('search-error');
  });

  it('renders empty message if no results', async () => {
    jest.spyOn(api, 'searchJobs').mockResolvedValue([]);
    render(<JobSearch setJobs={setJobs} />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'unknown' } });
    fireEvent.click(screen.getByTestId('search-button'));
    await screen.findByTestId('search-empty-message');
  });

  it('search is case-insensitive', async () => {
    jest.spyOn(api, 'searchJobs').mockResolvedValue([
      { id: 101, title: 'JavaScript Developer' }
    ]);
    render(<JobSearch setJobs={setJobs} />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'JAVASCRIPT' } });
    fireEvent.click(screen.getByTestId('search-button'));
    await waitFor(() => expect(setJobs).toHaveBeenCalledWith([
      expect.objectContaining({ title: 'JavaScript Developer' })
    ]));
  });
});
