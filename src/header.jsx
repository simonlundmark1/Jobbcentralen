    
function Header() {const headerStyle = {
  width: '1024px',
  height: '120px',
  border: '1px solid black',
  padding: '6px',
  boxSizing: 'border-box',
  margin: '0 auto', // This centers the header horizontally
  position: 'relative', // This positions your header relative to its normal position; you might not need this depending on your layout
  top: '0', // Ensures the header is at the top; adjust as needed
  backgroundColor: '#1D6453', // Sets the background color
  marginBottom: '6px', // Add a 6px bottom margin
  
};
/* 
const innerHeaderTopBar = {
  top: '-6px',
  height: '6px',
  backgroundColor: '#164D40',
  width: '100%', // Takes the full width of its parent
};

 */

  return (
    <div style={headerStyle}>
             {/*        <div style={innerHeaderTopBar}></div> */}
                   
      <img src="./src/assets/group 12-2-min.svg" alt="Logo" style={{ height: '70%', marginTop: '16px', marginLeft: '10px' }} />
    </div>
  );
}

export default Header;


