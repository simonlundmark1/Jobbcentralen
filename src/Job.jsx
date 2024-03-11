function Job({ job }) {

    const jobStyle = {
      height: '135px', // Set the height to 135px
      width: '1012px', // Assuming you want it to match the Header component's width
      border: '1px solid black', // Set the border to 1px solid black
      backgroundColor: '#F8F8F8', // Set the background color to #F8F8F8
      boxSizing: 'border-box', // Include padding and border in the element's size
  margin: 'auto auto 6px auto', // Sätter margin till 'top right bottom left'
    position: 'relative', // This positions your header relative to its normal position; you might not need this depending on your layout
    };
  

    const innerDivStyle = {
        height: '6px',
        width: '100%', // This makes the inner div as wide as its parent
        backgroundColor: '#E8E8E8',

      };

      const topLeftBoxStyle = {
        height: '40px', // Set the height to 40px
        width: '205px', // Set the width to 200px
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

      const infoTextStyle = {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '400', // Normal font weight
        fontSize: '14px', // Mindre fontstorlek
        textAlign: 'left',
        lineHeight: '118%',
        letterSpacing: '-0.02em', // Mindre letter-spacing
        marginLeft: '9px',
        color: '#000000', // Svart textfärg
      };

 // Conditional rendering för att hantera tomma dataobjekt
 if (!job) {
  return <div>Ingen jobbinfo tillgänglig!!!!!!!</div>;
}

return (
  <div style={jobStyle}>
    <div style={innerDivStyle}></div>
    <div style={topLeftBoxStyle}>
      <div style={innerTopLeftBarStyle}></div>
      <div style={innerTextStyle}>
        <p>{job.position}</p> 
      </div>
    </div>
    <p style={{...infoTextStyle, marginTop: '55px', fontWeight: 'bold'}}>
    {job.company}
    </p>
    <p style={{...infoTextStyle, marginTop: '-6px'}}>
    {job.level} {job.role}  
    </p>
    <p style={{...infoTextStyle, marginTop: '-6px', color: 'grey'}}>
      {job.location} - {job.contract} - {job.postedAt}
   </p>
  </div>
);
}

  export default Job;