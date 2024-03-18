import React, { useState, useEffect } from 'react';
import Header from './Header.jsx'; 
import Categories from './Categories.jsx'; 
import Job from './Job'; 
import './App.css'; 

const mainContainerStyle = {
  maxWidth: '1024px',
  margin: '-6px 6px 6px 25%', 
  backgroundColor: 'white',
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ role: '', level: '', location: '' });

  useEffect(() => {
    fetchJobs(""); 
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleEnterSearch = (e) => {
    if (e.key === 'Enter') {
      fetchJobs(e.target.value);
    }
  };

  const handleCategoryChange = (categoryType, value) => {
    setSelectedCategory(prev => ({ ...prev, [categoryType]: value }));
  };

  const fetchJobs = async (searchTerm) => {
    const apiUrl = `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(searchTerm)}`;
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.hits); // Jobben finns i hits
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Filtrering på kategori
  const filteredJobs = jobs.filter(job => (
    (selectedCategory.role ? job.role === selectedCategory.role : true) &&
    (selectedCategory.level ? job.level === selectedCategory.level : true) &&
    (selectedCategory.location ? job.location === selectedCategory.location : true)
  ));

  return (
    <div style={mainContainerStyle}>
      <Header />
      <Categories
        onSearch={handleSearch}
        onEnterSearch={handleEnterSearch}
        onCategoryChange={handleCategoryChange}
        jobs={filteredJobs}  // skicka filtrerade jobs som prop
      />
      {jobs.map((job, index) => (
        <Job key={index} job={job} index={index}  isEven={index % 2 === 0}  />
      ))}
    </div>
  );
}

export default App;
