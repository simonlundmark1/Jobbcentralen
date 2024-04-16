  import Job, { JobType } from './Job';
  import React, { useState } from 'react';  
  import { useDispatch, useSelector } from 'react-redux';
  import { setCategoryFilter, fetchJobs } from './features/jobs/jobsSlice';
  import { RootState, AppDispatch } from './store'; // Import AppDispatch
  import thunk from 'redux-thunk';
  import { createStore, applyMiddleware, combineReducers } from 'redux';

/* 

const jobs = useSelector((state: RootState) => state.jobs.entities);
const loading = useSelector((state: RootState) => state.jobs.loading); */
enum CategoryType {
  Location = "location",
  Level = "level",
  Role = "role"
}


  interface CategoriesProps {
    onSearch: (term: string) => void;
    onEnterSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onCategoryChange: (categoryType: string, value: string) => void;
    jobs: JobType[];  // Use JobType here instead of Job
  }


  const Categories: React.FC<CategoriesProps> = ({ onSearch, onEnterSearch, onCategoryChange, jobs }) => {
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type here
    
    const loading = useSelector((state: RootState) => state.jobs.loading);



    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState('');
    const [level, setLevel] = useState('');
    const [location, setLocation] = useState('');
  

    const handleSearch = (term: string) => {
      const params = { searchTerm: term, filters: {} };
      console.log("Searching with params:", params);
      dispatch(fetchJobs(params));  // Corrected
  };
  
  const fetchJobs = (params: { searchTerm: string, filters: any }) => async (dispatch: AppDispatch) => {
    console.log("Fetching jobs with parameters:", params);
    // Example of dispatching an action after fetching data
    // const data = await fetchDataSomehow(params);
    // dispatch({ type: 'SET_JOB_DATA', payload: data });
};
    

    const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch(searchTerm);
      }
    };

    const handleCategoryChange = (categoryType: CategoryType, value: string) => {
      dispatch(setCategoryFilter({ categoryType, value }));
      handleSearch(searchTerm);
    };
    
    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRole(e.target.value);
      handleCategoryChange(CategoryType.Role, e.target.value); // Correct usage of enum for type safety
    };
    
  
const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setLevel(e.target.value);
  handleCategoryChange(CategoryType.Level, e.target.value); // Now correctly typed
};
  
const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setLocation(e.target.value);
  handleCategoryChange(CategoryType.Location, e.target.value); // Now correctly typed
};
  

    const categoriesStyle = {
        height: '185px', 
        width: '1012px', 
        border: '1px solid black',
        backgroundColor: '#D3E0D1', 
        margin: '0 auto', 
        position: 'relative' as 'relative',  // Use TypeScript's 'as' keyword to cast literals
        padding: '6px',
        boxSizing: 'border-box' as 'border-box',  // Use as to assert the type
        marginBottom: '6px',
      };
      
    const textStyle = {
  /*     color: '#FFFFFF',
  */    fontFamily: 'Inter, sans-serif', 
      fontWeight: '700',
      fontSize: '19px', 
      textAlign: 'left' as 'left',  // Use as to assert the type
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
        flexDirection: 'column' as 'column',  // Use as to assert the type
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          onKeyPress={handleEnterSearch}
  //ENter!!
        />

          <div style={dropdownContainerStyle}>
            <div style={dropdownGroupStyle}>
              <div style={labelStyle}>Yrke</div>
              <select style={dropdownStyle} value={role} onChange={handleRoleChange}>
                <option value="">Alla</option>
                {/* Additional options */}
              </select>
            </div>
    
            <div style={dropdownGroupStyle}>
              <div style={labelStyle}>Område</div>
              <select style={dropdownStyle} value={level} onChange={handleLevelChange}>
                <option value="">Alla</option>
            ´´
              </select>
            </div>
    
            <div style={dropdownGroupStyle}>
              <div style={labelStyle}>Omfattning</div>
              <select style={{ ...dropdownStyle, marginRight: '0' }} value={location} onChange={handleLocationChange}>
                <option value="">Alla</option>
                {/* Additional options */}
              </select>
            </div>
          </div>
        </div>
      );
    }
    
    export default Categories;
    