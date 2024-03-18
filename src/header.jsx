    
function Header() {const headerStyle = {
  width: '1012px',
  height: '120px',
  border: '1px solid black',
  padding: '6px',
  boxSizing: 'border-box',
  margin: '6px auto', 
  position: 'relative', 
  top: '0', 
  backgroundColor: '#1D6453',
  marginBottom: '6px',
  
};

/* 
const innerHeaderTopBar = {
  top: '-6px',
  height: '6px',
  backgroundColor: '#164D40',
  width: '100%', 
};

*/

const loginTextStyle = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bold', 
  fontSize: '22px', 
  textAlign: 'left',
  lineHeight: '118%',
  letterSpacing: '-0.02em',
  color: 'white', 
  marginLeft: '870px', 
  marginTop: '-50px'
};

const pil = {
  marginTop: '-26px',
  marginLeft: '-14px'
}
/* 
const innerTextStyle = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: '700', /
  fontSize: '20px',
  textAlign: 'left',
  lineHeight: '118%',
  letterSpacing: '-0.04em',
  marginLeft: '6px',
  marginTop: '-4px',
  color: '#FFFFFF', 
};
 */

  return (
    <div style={headerStyle}>
             {/*        <div style={innerHeaderTopBar}></div> */}
                   
      <img src="/src/assets/group 12-2-min.svg" alt="Logo" style={{ height: '70%', marginTop: '16px', marginLeft: '10px' }} />
      <div style={loginTextStyle}>Logga in </div> {}
      <div style={pil}><img src="/src/assets/pil.svg" alt="Arrow" style={{ marginLeft: '975px', height: '100%' }}/>
</div> 
<div style={{...loginTextStyle, fontSize: '13px', marginTop: '-3px'}}>Registrera dig</div>
    </div>
  );
}

export default Header;


