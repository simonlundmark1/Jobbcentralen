import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter, fetchJobs, JobFilters } from './features/jobs/jobsSlice';
import { RootState, AppDispatch } from './store';
import { Job as JobType } from './Job';

/* 

const jobs = useSelector((state: RootState) => state.jobs.entities);
const loading = useSelector((state: RootState) => state.jobs.loading); */

enum CategoryType {
  OccupationField = "occupationField",
  Municipality = "municipality",
  WorkTimeExtent = "workTimeExtent"
}

interface CategoriesProps {
  jobs: JobType[];
}

const Categories: React.FC<CategoriesProps> = ({ jobs }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentFilters = useSelector((state: RootState) => state.jobs.currentFilters);

  const [searchTerm, setSearchTerm] = useState('');
  const [occupationField, setOccupationField] = useState(currentFilters.occupationField || '');
  const [municipality, setMunicipality] = useState(currentFilters.municipality || '');
  const [workTimeExtent, setWorkTimeExtent] = useState(currentFilters.workTimeExtent || '');

  const uniqueOccupationFields = Array.from(new Set(jobs.map(job => job.occupation_field?.label).filter(Boolean)));
  const uniqueMunicipalities = Array.from(new Set(jobs.map(job => job.workplace_address?.municipality).filter(Boolean)));
  const uniqueWorkTimeExtents = Array.from(new Set(jobs.map(job => job.working_hours_type?.label).filter(Boolean)));

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTriggerSearch = () => {
    console.log("Triggering search with term:", searchTerm, "and filters:", currentFilters);
    dispatch(fetchJobs({ searchTerm, filters: currentFilters }));
  };

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTriggerSearch();
    }
  };

  const handleFilterChange = (categoryType: CategoryType, value: string) => {
    switch (categoryType) {
      case CategoryType.OccupationField:
        setOccupationField(value);
        break;
      case CategoryType.Municipality:
        setMunicipality(value);
        break;
      case CategoryType.WorkTimeExtent:
        setWorkTimeExtent(value);
        break;
    }

    dispatch(setCategoryFilter({ categoryType, value }));

    const updatedFilters = {
      ...currentFilters,
      [categoryType]: value
    };
    dispatch(fetchJobs({ searchTerm, filters: updatedFilters }));
  };

  const categoriesStyle = {
    height: '185px', 
    width: '1012px', 
    border: '1px solid black',
    backgroundColor: '#D3E0D1', 
    margin: '0 auto', 
    position: 'relative' as 'relative',
    boxSizing: 'border-box' as 'border-box',
    marginBottom: '6px',
    padding: '8px',
  };
  
  const textStyle = {
    fontFamily: 'Inter, sans-serif', 
    fontWeight: '700',
    fontSize: '19px', 
    textAlign: 'left' as 'left',
    marginTop: '5px',
    lineHeight: '118%', 
    letterSpacing: '-0.04em',
    marginLeft: '2px', 
  };

  const labelStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    color: 'black',
    marginTop: '-9px',
    marginLeft: '2px',
    marginBottom: '4px', 
  };
  
  const dropdownStyle = {
    width: '106px',
    height: '30px',
    border: '1px solid black',
    backgroundColor: 'white',
    marginRight: '6px',
  };

  const dropdownContainerStyle = {
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'flex-start', 
    gap: '6px', 
    marginBottom: '6px'
  };

  const dropdownGroupStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
  };

  const searchBar = {
    display: 'flex',
    width: '340px',
    height: '30px',
    border: '1px solid black',
    backgroundColor: 'white',
    marginRight: '6px',
  };

  return (
    <div style={categoriesStyle}>
      <p style={textStyle}>Vad vill du jobba med?</p>
      <p style={labelStyle}>Sök</p>
      <input
        type="search"
        style={searchBar}
        placeholder="Sök jobb, yrken, områden..."
        value={searchTerm}
        onChange={handleSearchInputChange}
        onKeyPress={handleEnterSearch}
      />

      <div style={dropdownContainerStyle}>
        <div style={dropdownGroupStyle}>
          <div style={labelStyle}>Yrkesområde</div>
          <select
            style={dropdownStyle}
            value={occupationField}
            onChange={(e) => handleFilterChange(CategoryType.OccupationField, e.target.value)}
          >
            <option value="">Alla</option>
            {uniqueOccupationFields.map((field, index) => (
              <option key={`occupation-${index}`} value={field}>{field}</option>
            ))}
          </select>
        </div>
    
        <div style={dropdownGroupStyle}>
          <div style={labelStyle}>Plats</div>
          <select
            style={dropdownStyle}
            value={municipality}
            onChange={(e) => handleFilterChange(CategoryType.Municipality, e.target.value)}
          >
            <option value="">Alla</option>
            {uniqueMunicipalities.map((city, index) => (
              <option key={`municipality-${index}`} value={city}>{city}</option>
            ))}
          </select>
        </div>
    
        <div style={dropdownGroupStyle}>
          <div style={labelStyle}>Omfattning</div>
          <select
            style={{ ...dropdownStyle, marginRight: '0' }}
            value={workTimeExtent}
            onChange={(e) => handleFilterChange(CategoryType.WorkTimeExtent, e.target.value)}
          >
            <option value="">Alla</option>
            {uniqueWorkTimeExtents.map((extent, index) => (
              <option key={`extent-${index}`} value={extent}>{extent}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Categories;
    