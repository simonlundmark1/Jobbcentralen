import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const headerStyle = {
    width: '1012px',
    height: '120px',
    border: '1px solid black',
    padding: '6px',
    boxSizing: 'border-box',
    margin: '6px auto', 
    position: 'relative', 
    top: '0', 
    backgroundColor: '#1D6453',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const logoStyle = {
    height: '70%',
    marginLeft: '10px',
    cursor: 'pointer',
  };

  const loginTextStyle = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold', 
    fontSize: '22px', 
    color: 'white',
    cursor: 'pointer',
  };

  const registerTextStyle = {
    ...loginTextStyle,
    fontSize: '13px',
    cursor: 'pointer',
  };

  const arrowStyle = {
    height: '100%',
    marginLeft: '4px',
    marginTop: '2px'
  };


  return (
    <div style={headerStyle}>
      <Link to="/">
        <img src="/src/assets/group 12-2-min.svg" alt="Logo" style={logoStyle} />
      </Link>
      <div>
        <Link to="/signin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <div style={loginTextStyle}>Logga in</div>
          <img src="/src/assets/pil.svg" alt="Arrow" style={arrowStyle} />
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <div style={registerTextStyle}>Registrera dig</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
