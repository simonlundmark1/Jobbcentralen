import Header from './header.jsx'; // Make sure the path to Header.js is correct
import Categories from './Categories.jsx'; // Import the Categories component
import Job from './Job'; // Import the Job component


function App() {
  return (
    <div>
      <Header />
      <Categories /> {/* Place the Categories component just below the Header component */}
      <Job /> {/* Place the Job component just below the Categories component */}

      {/* Other components or content here */}
    </div>
  );
}

export default App;