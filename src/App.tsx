import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx'; 
import Categories from './Categories.jsx'; 
import Job from './Job'; 
import JobsList from './JobsList.jsx';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { AuthProvider } from './AuthContext';
import './App.css'; 
import { createRoot } from 'react-dom/client';

interface Job {
  role: string;
  level: string;
  location: string;
}


const mainContainerStyle = {
  maxWidth: '1024px',
  margin: '0 auto', // Centrerar huvudcontainern
  backgroundColor: 'white',
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);  // This line seems to be outside of any functional component or incorrectly placed
  const [selectedCategory, setSelectedCategory] = useState({ role: '', level: '', location: '' });

  useEffect(() => {
    fetchJobs(""); 
  }, []);

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
};

const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
        fetchJobs(e.currentTarget.value);
    }
};

const handleCategoryChange = (categoryType: string, value: string): void => {
    setSelectedCategory(prev => ({ ...prev, [categoryType]: value }));
};

const fetchJobs = async (searchTerm: string): Promise<void> => {
    const apiUrl = `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(searchTerm)}`;
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.hits);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const filteredJobs = jobs.filter(job => (
    (selectedCategory.role ? job.role === selectedCategory.role : true) &&
    (selectedCategory.level ? job.level === selectedCategory.level : true) &&
    (selectedCategory.location ? job.location === selectedCategory.location : true)
  ));

  return (


    <React.StrictMode>

    <AuthProvider>
      <Router>
      <div style={{...mainContainerStyle, position: 'relative'}}>
            {/* Background Video */}
            <video autoPlay loop muted style={{
              position: 'absolute',
              width: '100%',
              left: '50%',
              top: '50%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translate(-50%, -50%)',
              zIndex: '-1', // Ensure it stays in the background
            }}>
              <source src="/skrap.mp4" type="video/mp4"/>
              Your browser does not support the video tag.
            </video>

        <div style={mainContainerStyle}>
          
          <Header />
          <Routes>
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/jobs" element={<JobsList />} />
           <Route path="/" element={<JobsList />} /> {/* Lägger till denna rad */}
          </Routes>
        </div>
        </div>
      </Router>
    </AuthProvider>

    </React.StrictMode>

  );
}

export default App;
