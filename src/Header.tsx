

import React, { useContext, createContext  } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext.jsx'; 

interface AuthContextType {
  currentUser: any;  
  signout: () => Promise<void>;
}

const AuthContextLocal = createContext<AuthContextType>({
  currentUser: null,  
  signout: async () => {
   
  },
});


function Header() {
  const headerStyle = {
    width: '1012px',
    height: '120px',
    border: '1px solid black',
    padding: '6px',
    boxSizing: 'border-box' as 'border-box',  // Explicit type assertion
    margin: '6px auto', 
    position: 'relative' as 'relative',  // Correct type assertion for position
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

  const { currentUser, signout } = useContext<AuthContextType>(AuthContextLocal);
  const navigate = useNavigate(); 
  const handleLogout = async () => {
    try {
      await signout(); 
      navigate('/'); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div style={headerStyle}>
      <Link to="/">
        <img src="/group 12-2-min.svg" alt="Logo" style={logoStyle} />
      </Link>
      <div>
        {currentUser ? (
          <>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <div style={loginTextStyle}>Min profil</div>
            </Link>
            {/* Add "Logga ut" option for signed-in users */}
            <div style={registerTextStyle} onClick={handleLogout}>Logga ut</div>
          </>
        ) : (
          <>
            <Link to="/signin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <div style={loginTextStyle}>Logga in</div>
              <img src="/pil.svg" alt="Arrow" style={arrowStyle} />
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <div style={registerTextStyle}>Registrera dig</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );

}

export default Header;
