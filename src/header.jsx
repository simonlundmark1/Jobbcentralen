    
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
const loginTextStyle = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bold', // Normal font weight
  fontSize: '22px', // Mindre fontstorlek
  textAlign: 'left',
  lineHeight: '118%',
  letterSpacing: '-0.02em', // Mindre letter-spacing
  color: 'white', // Svart textfärg
  marginLeft: '880px', // Skjut texten till höger
  marginTop: '-50px'
};

const pil = {
  marginTop: '-26px',
  marginLeft: '-3px'
}
/* 
const innerTextStyle = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: '700', // Bold font weight, equivalent to 'bold'
  fontSize: '20px',
  textAlign: 'left',
  lineHeight: '118%',
  letterSpacing: '-0.04em',
  marginLeft: '6px', // Margin to push the text a bit to the right
  marginTop: '-4px',
  color: '#FFFFFF', // Set the font color to white
};
 */

  return (
    <div style={headerStyle}>
             {/*        <div style={innerHeaderTopBar}></div> */}
                   
      <img src="/src/assets/group 12-2-min.svg" alt="Logo" style={{ height: '70%', marginTop: '16px', marginLeft: '10px' }} />
      <div style={loginTextStyle}>Logga in </div> {/* Använd den nya loginTextStyle */}
      <div style={pil}><img src="/src/assets/pil.svg" alt="Arrow" style={{ marginLeft: '975px', height: '100%' }}/>
</div> 
<div style={{...loginTextStyle, fontSize: '13px', marginTop: '0px'}}>Registrera dig</div>
    </div>
  );
}

export default Header;


