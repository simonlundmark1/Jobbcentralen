function Categories() {
    const categoriesStyle = {
      height: '120px', // Height set to 120px
      width: '1012px', // Width set to 100% to take the full width available
      border: '1px solid black', // Black border at 1px
      backgroundColor: '#D3E0D1', // Background color set to #D3E0D1
      margin: '0 auto', // This centers the header horizontally
      position: 'relative', // This positions your header relative to its normal position; you might not need this depending on your layout
      padding: '6px',
      boxSizing: 'border-box', // Ensure the padding is included in the element's total width and height
      marginBottom: '6px', // Add a 6px bottom margin
    };

    
  const textStyle = {
/*     color: '#FFFFFF', // Set the font color to white
 */    fontFamily: 'Inter, sans-serif', // Specifying the Inter font along with a fallback
    fontWeight: '700', // Bold font weight
    fontSize: '19px', // Font size set to 19px
    textAlign: 'left', // Align text to the left
    // Ensure text alignment within the component, considering padding
    lineHeight: '118%', // Center the text vertically, adjust based on your design needs
    letterSpacing: '-0.04em',
    marginLeft: '2px', // Add 5px margin to the left
    };


    const labelStyle = {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      color: 'black',
      marginTop: '-9px', // Lägg till lite utrymme mellan etiketten och dropdownen
      marginLeft: '2px',
      marginBottom: '4px', // Minska detta värde för att flytta upp texten lite

    };
  

    const dropdownStyle = {
      width: '200px',
      height: '30px',
      border: '1px solid black',
      backgroundColor: 'white',
      marginRight: '6px', // 6px mellanrum mellan dropdown-listorna
    };

    const dropdownContainerStyle = {
      display: 'flex', // Använder Flexbox för att arrangera containers bredvid varandra
      justifyContent: 'flex-start', // Startar arrangemanget från vänsterkanten
      gap: '6px', // Lägger till ett mellanrum mellan varje dropdown-container
      marginBottom: '6px'
      
  
    };
    const dropdownGroupStyle = {
      display: 'flex', // Använder Flexbox för att arrangera etiketten ovanför dropdown-listan
      flexDirection: 'column', // Arrangerar innehållet vertikalt
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
  