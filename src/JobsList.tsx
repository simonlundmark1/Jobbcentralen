import React, { useState, useEffect } from 'react';
import Header from './Header';
import Categories from './Categories';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';  // Ensure this path is correct
import { fetchJobs as fetchJobsAction } from './features/jobs/jobsSlice'; // Import the Redux action if used
import { AppDispatch } from './store'; // Import the AppDispatch type from your store file

const dispatch: AppDispatch = useDispatch();
dispatch(fetchJobsAction({ searchTerm: "", filters: {} }));



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
  const dispatch: AppDispatch = useDispatch();  // This should be inside the component
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>({ role: '', level: '', location: '' });

  useEffect(() => {
dispatch(fetchJobsAction({searchTerm: "", filters: {}}));  // Correct usage
  }, [dispatch]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    dispatch(fetchJobsAction({searchTerm: "", filters: {}}));  // Correct usage
  };

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent the default form submit behavior
      handleSearch(e.currentTarget.value);
    }
  };

  const handleCategoryChange = (categoryType: string, value: string) => {
    setSelectedCategory(prev => ({ ...prev, [categoryType]: value }));
  };

  // Use the Redux state directly for jobs and loading state
  const reduxJobs = useSelector((state: RootState) => state.jobs.entities);
  const loading = useSelector((state: RootState) => state.jobs.loading);

  // Filtering based on category
  const filteredJobs = reduxJobs.filter(job => (
    (selectedCategory.role ? job.role === selectedCategory.role : true) &&
    (selectedCategory.level ? job.level === selectedCategory.level : true) &&
    (selectedCategory.location ? job.location === selectedCategory.location : true)
  ));

  if (loading === 'pending') {
    return <div>Loading...</div>;
  }

  return (
    <div>
<Categories
  onSearch={handleSearch}
  onEnterSearch={handleEnterSearch}
  onCategoryChange={handleCategoryChange}
  jobs={filteredJobs as JobType[]}
/>

      {filteredJobs.map((job, index) => (
        <Job key={index} job={job} index={index} isEven={index % 2 === 0} />
      ))}
    </div>
  );
}

export default JobsList;
