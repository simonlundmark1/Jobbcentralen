import React, { useState, useEffect } from 'react';
import Header from './Header';
import Categories from './Categories';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';  // Ensure this path is correct
import { fetchJobs as fetchJobsAction } from './features/jobs/jobsSlice'; // Import the Redux action if used
import { AppDispatch } from './store'; // Import the AppDispatch type from your store file

interface Category {
  role: string;
  level: string;
  location: string;
}
interface Job {
  role: string;
  level: string;
  location: string;
  headline?: string;
  employer?: {
    name?: string;
  };
  application_deadline?: string;
  workplace_address?: {
    city?: string;
  };
}
  interface JobProps {
    job: {
      headline?: string;
      employer?: { name?: string };
      application_deadline?: string;
      workplace_address?: { city?: string };
    };
    index: number;
    isEven: boolean;
  }
  

interface JobType extends Job {
  // Example additional property
  additionalDetail?: string;
}


function JobsList() {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>({ role: '', level: '', location: '' });

  // Get filters from Redux state
  const filters = useSelector((state: RootState) => state.jobs.currentFilters);
  
  useEffect(() => {
    // Initial job fetch when component mounts
    dispatch(fetchJobsAction({searchTerm: "", filters}));
  }, [dispatch]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    dispatch(fetchJobsAction({searchTerm: term, filters}));
  };

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e.currentTarget.value);
    }
  };

  const handleCategoryChange = (categoryType: string, value: string) => {
    setSelectedCategory(prev => ({ ...prev, [categoryType]: value }));
    
    // No need to dispatch here as Categories component already does it
  };

  // Get jobs and loading state from Redux
  const reduxJobs = useSelector((state: RootState) => state.jobs.entities);
  const loading = useSelector((state: RootState) => state.jobs.loading);

  if (loading === 'pending') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Categories
        onSearch={handleSearch}
        onEnterSearch={handleEnterSearch}
        onCategoryChange={handleCategoryChange}
        jobs={reduxJobs}
      />

      {reduxJobs.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          Inga jobb hittades med de valda filtren.
        </div>
      ) : (
        reduxJobs.map((job, index) => (
          <Job key={index} job={job} index={index} isEven={index % 2 === 0} />
        ))
      )}
    </div>
  );
}

export default JobsList;
