function Job() {
    const jobStyle = {
      height: '135px', // Set the height to 135px
      width: '1024px', // Assuming you want it to match the Header component's width
      border: '1px solid black', // Set the border to 1px solid black
      backgroundColor: '#F8F8F8', // Set the background color to #F8F8F8
      boxSizing: 'border-box', // Include padding and border in the element's size
      marginBottom: '6px', // Add a 6px bottom margin
    position: 'relative', // This positions your header relative to its normal position; you might not need this depending on your layout
    margin: 'auto', //
    };
  

    const innerDivStyle = {
        height: '6px',
        width: '100%', // This makes the inner div as wide as its parent
        backgroundColor: '#E8E8E8',

      };

      const topLeftBoxStyle = {
        height: '40px', // Set the height to 40px
        width: '200px', // Set the width to 200px
        backgroundColor: '#247A66', // Set the background color
        position: 'absolute', // Position it absolutely within the relative parent
        top: '12px', // 6px from the top edge of the parent
        left: '6px', // 6px from the left edge of the parent
        border: '1px solid black'
      };

      const innerTopLeftBarStyle = {
        height: '6px',
        backgroundColor: '#1D6453',
        width: '100%', // Takes the full width of its parent
      };

      const innerTextStyle = {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '700', // Bold font weight, equivalent to 'bold'
        fontSize: '16px',
        textAlign: 'left',
        lineHeight: '118%',
        letterSpacing: '-0.04em',
        marginLeft: '6px', // Margin to push the text a bit to the right
        marginTop: '-4px',
        color: '#FFFFFF', // Set the font color to white
      };

    return (
      <div style={jobStyle}>
              <div style={innerDivStyle}></div> {/* Inner div for visual styling */}
              <div style={topLeftBoxStyle}>
                    <div style={innerTopLeftBarStyle}></div>
                    <div style={innerTextStyle}>
                        <p>Front End Developer</p>
                    </div>
                     {/* This is the inner top bar div */}
</div> {/* The new top-left box */}

        {/* Content for the Job component goes here */}
      </div>
    );
  }
  
  export default Job;
  