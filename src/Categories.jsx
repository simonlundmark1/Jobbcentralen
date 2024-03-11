function Categories() {
    const categoriesStyle = {
      height: '120px', // Height set to 120px
      width: '1024px', // Width set to 100% to take the full width available
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
    marginLeft: '5px', // Add 5px margin to the left
    };

    return (
      <div style={categoriesStyle}>
        <p style={textStyle}>Vad vill du jobba med?</p>
      </div>
    );
  }
  export default Categories;
  