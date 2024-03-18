import React, { useState } from 'react';

function Categories({ onSearch, onEnterSearch, onCategoryChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);  // Uppdaterar searchTerm 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);  // triggar sök
    }
  };

  // För kategorier/byte
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    onCategoryChange('role', e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
    onCategoryChange('level', e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    onCategoryChange('location', e.target.value);
  };

  const categoriesStyle = {
      height: '185px', 
      width: '1012px', 
      border: '1px solid black',
      backgroundColor: '#D3E0D1', 
      margin: '0 auto', 
      position: 'relative', 
      padding: '6px',
      boxSizing: 'border-box', 
      marginBottom: '6px',
    };
    
  const textStyle = {
/*     color: '#FFFFFF',
 */    fontFamily: 'Inter, sans-serif', 
    fontWeight: '700',
    fontSize: '19px', 
    textAlign: 'left', 
   marginTop: '5px',
    lineHeight: '118%', 
    letterSpacing: '-0.04em',
    marginLeft: '2px', 
    };


    const labelStyle = {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      color: 'black',
      marginTop: '-9px',
      marginLeft: '2px',
      marginBottom: '4px', 
    };
  
    const dropdownStyle = {
      width: '106px',
      height: '30px',
      border: '1px solid black',
      backgroundColor: 'white',
      marginRight: '6px',
    };

    const dropdownContainerStyle = {
      display: 'flex',
      marginTop: '20px',
      justifyContent: 'flex-start', 
      gap: '6px', 
      marginBottom: '6px'
    };

    const dropdownGroupStyle = {
      display: 'flex',
      flexDirection: 'column',
    };

    const searchBar = {
      display: 'flex',
      width: '340px',
      height: '30px',
      border: '1px solid black',
      backgroundColor: 'white',
      marginRight: '6px',
    };

    return (
      <div style={categoriesStyle}>
        <p style={textStyle}>Vad vill du jobba med?</p>
        <p style={labelStyle}>Sök</p>
        <input
        type="search"
        style={searchBar}
        placeholder="Sök jobb, yrken, områden..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} //Uppdaterar searchterm vid ändring
        onKeyPress={onEnterSearch} //ENter!!
      />

        <div style={dropdownContainerStyle}>
          <div style={dropdownGroupStyle}>
            <div style={labelStyle}>Yrke</div>
            <select style={dropdownStyle} value={role} onChange={handleRoleChange}>
              <option value="">Alla</option>
              {/* Additional options */}
            </select>
          </div>
  
          <div style={dropdownGroupStyle}>
            <div style={labelStyle}>Område</div>
            <select style={dropdownStyle} value={level} onChange={handleLevelChange}>
              <option value="">Alla</option>
          ´´
            </select>
          </div>
  
          <div style={dropdownGroupStyle}>
            <div style={labelStyle}>Omfattning</div>
            <select style={{ ...dropdownStyle, marginRight: '0' }} value={location} onChange={handleLocationChange}>
              <option value="">Alla</option>
              {/* Additional options */}
            </select>
          </div>
        </div>
      </div>
    );
  }
  
  export default Categories;
  