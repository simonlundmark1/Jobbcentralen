import React, { useState, useEffect } from 'react';
import Header from './Header';
import Categories from './Categories';
import Job from './Job';

function JobsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ role: '', level: '', location: '' });

  useEffect(() => {
    fetchJobs(""); // Hämta alla jobb när komponenten monteras, eller använd en standard sökterm
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleEnterSearch = (e) => {
    if (e.key === 'Enter') {
      fetchJobs(e.target.value); // Anropa fetchJobs när Enter trycks
    }
  };

  const handleCategoryChange = (categoryType, value) => {
    setSelectedCategory(prev => ({ ...prev, [categoryType]: value }));
  };

  const fetchJobs = async (searchTerm) => {
    const apiUrl = `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(searchTerm)}`;
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }
      const data = await response.json();
      setJobs(data.hits); // Jobbannonser finns i 'hits'
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Filtrering baserad på kategori
  const filteredJobs = jobs.filter(job => (
    (selectedCategory.role ? job.role === selectedCategory.role : true) &&
    (selectedCategory.level ? job.level === selectedCategory.level : true) &&
    (selectedCategory.location ? job.location === selectedCategory.location : true)
  ));

  return (
    <div>
 
      <Categories
        onSearch={handleSearch}
        onEnterSearch={handleEnterSearch}
        onCategoryChange={handleCategoryChange}
        jobs={filteredJobs}  // Skicka filtrerade jobbannonser som en prop
      />
      {filteredJobs.map((job, index) => (
        <Job key={index} job={job} index={index} isEven={index % 2 === 0} />
      ))}
    </div>
  );
}

export default JobsList;
