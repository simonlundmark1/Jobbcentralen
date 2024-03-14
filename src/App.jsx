import Header from './header.jsx'; 
import Categories from './Categories.jsx'; 
import Job from './Job'; 
import { jobs } from './jobsData';
import './App.css'; 

const mainContainerStyle = {
  maxWidth: '1024px',
  margin: '-6px 6px 6px 25%', 
  backgroundColor: 'white',
 
};

function App() {
  return (
    <div style={mainContainerStyle}>
    <div>
      <Header />
      <Categories /> {/* Place the Categories component just below the Header component */}
      {jobs.map(job => (
        <Job key={job.id} job={job} /> 
      ))}

      {/* Other components or content here */}
    </div>
    </div>
  );
}

export default App; 