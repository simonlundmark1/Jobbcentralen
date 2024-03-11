import Header from './header.jsx'; // Make sure the path to Header.js is correct
import Categories from './Categories.jsx'; // Import the Categories component
import Job from './Job'; // Import the Job component
import { jobs } from './jobsData';
import './App.css'; // Or the path to your global CSS file


const mainContainerStyle = {
  maxWidth: '1024px',
  margin: '-6px 6px 6px 25%', // This centers the div
  backgroundColor: 'white', // Or any color for the content background
  // Additional styles as needed
};


function App() {
  return (
    <div style={mainContainerStyle}>
    <div>
      <Header />
      <Categories /> {/* Place the Categories component just below the Header component */}
      {jobs.map(job => (
        <Job key={job.id} job={job} /> // Använd 'key' prop för unik identifiering
      ))}

      {/* Other components or content here */}
    </div>
    </div>
  );
}


export default App;