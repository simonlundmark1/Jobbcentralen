import Header from './header.jsx'; // Make sure the path to Header.js is correct
import Categories from './Categories.jsx'; // Import the Categories component
import Job from './Job'; // Import the Job component
import { jobs } from './jobsData';

function App() {
  return (
    <div>
      <Header />
      <Categories /> {/* Place the Categories component just below the Header component */}
      {jobs.map(job => (
        <Job key={job.id} job={job} /> // Använd 'key' prop för unik identifiering
      ))}

      {/* Other components or content here */}
    </div>
  );
}

export default App;