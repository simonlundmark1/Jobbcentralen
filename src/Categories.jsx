function Categories() {
    const categoriesStyle = {
      height: '120px', 
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
      width: '200px',
      height: '30px',
      border: '1px solid black',
      backgroundColor: 'white',
      marginRight: '6px',
    };

    const dropdownContainerStyle = {
      display: 'flex',
      justifyContent: 'flex-start', 
      gap: '6px', 
      marginBottom: '6px'
      
  
    };
    const dropdownGroupStyle = {
      display: 'flex',
      flexDirection: 'column',
    };


    return (
      <div style={categoriesStyle}>
        <p style={textStyle}>Vad vill du jobba med?</p>
        <div style={dropdownContainerStyle}>
          {/* Container för första dropdown-listan och dess etikett */}
          <div style={dropdownGroupStyle}>
            <div style={labelStyle}>Yrke</div>
            <select style={dropdownStyle}>
              <option value="">Alla</option>
              {/* Ytterligare <option>-element här */}
            </select>
          </div>
  
          {/* Container för andra dropdown-listan och dess etikett */}
          <div style={dropdownGroupStyle}>
            <div style={labelStyle}>Område</div>
            <select style={dropdownStyle}>
              <option value="">Alla</option>
              {/* Ytterligare <option>-element här */}
            </select>
          </div>
  
          {/* Container för tredje dropdown-listan och dess etikett, utan extra marginRight */}
          <div style={dropdownGroupStyle}>
            <div style={labelStyle}>Omfattning</div>
            <select style={{ ...dropdownStyle, marginRight: '0' }}>
              <option value="">Alla</option>
              {/* Ytterligare <option>-element här */}
            </select>
          </div>
        </div>
      </div>
    );
  }

  export default Categories;
  