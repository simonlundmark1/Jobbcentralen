import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Categories from './Categories';
import Job from './Job';
import JobsList from './JobsList';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { AuthProvider } from './AuthContext';
import JobDetailPage from './JobDetailPage';
import './App.css';

const mainContainerStyle = {
  maxWidth: '1024px',
  margin: '0 auto', // Centrerar huvudcontainern
  backgroundColor: 'white',
};

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <div style={mainContainerStyle}>
            <Header />
            <Routes>
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/job/:jobId" element={<JobDetailPage />} />
              <Route path="/jobs" element={<JobsList />} />
              <Route path="/" element={<JobsList />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
