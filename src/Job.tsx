  import styles from './css/JobStyles.module.css';



  export interface JobType {
    headline?: string;
    employer?: {
        name?: string;
    };
    application_deadline?: string;
    workplace_address?: {
        city?: string;
    };
  }

  function formatDate(dateString: string): string {
    const months = [
      'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
      'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
    ];

    const date = new Date(dateString);
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }

  interface JobProps {
    job: {
      headline?: string;
      employer?: { name?: string };
      application_deadline?: string;
      workplace_address?: { city?: string };
    };
    index: number;
    isEven: boolean;
  }
  /* 
  const Job: React.FC<JobProps> = ({ job, index, isEven }) => {
    return (
        <div className={styles.jobStyle}>
            <div className={styles.innerDivStyle}></div>
            <div className={styles.topLeftBoxStyle}>
                <div className={styles.innerTopLeftBarStyle}></div>
                <div className={styles.innerTextStyle}>
                    <p>{job.headline}</p>
                    <p className={styles.infoTextStyle}>{job.workplace_address?.city ?? 'Plats ej tillgänglig'}</p>
                </div>
            </div>
            <p className={`${styles.infoTextStyle} ${styles.boldText}`}>{job.employer?.name ?? 'Företagsnamn ej tillgängligt'}</p>
            <p className={styles.infoTextStyle}>Sista ansökningsdatum: {job.application_deadline}</p>
        </div>
    );
  }
  */




    const Job: React.FC<JobProps> = ({ job, index, isEven }) => {

    const greenShade = 120 - (index * 10); 

    type BoxSizing = "border-box" | "content-box" | undefined;
    type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';


    const jobStyle: React.CSSProperties = {
      height: '135px', 
        width: '1012px',
        border: '1px solid black', 
        backgroundColor: isEven ? '#F8F8+8' : '#F8F8+8', // Mörkare bakgrund för udda index
        boxSizing: 'border-box', 
    margin: 'auto auto 6px auto', 
      position: 'relative',
      };
    

      const innerDivStyle: React.CSSProperties  = {
          height: '6px',
          width: '100%', 
          backgroundColor: '#E8E8E8',
        };

        const topLeftBoxStyle: React.CSSProperties  = {
          height: '40px', 
          width: '98.5%', 
          position: 'absolute', 
          top: '12px',
          left: '6px',
          border: '1px solid black',
          whiteSpace: 'nowrap',
          backgroundColor: `rgb(29, ${greenShade}, 83)`,
        };

        const innerTopLeftBarStyle: React.CSSProperties  = {
          height: '6px',
          backgroundColor: `rgb(19, ${greenShade - 15}, 73)`, 
          width: '100%', 
        };

        const innerTextStyle: React.CSSProperties  = {
          fontFamily: 'Inter, sans-serif',
          fontWeight: '700',
          fontSize: '16px',
          textAlign: 'left',
          lineHeight: '118%',
          letterSpacing: '-0.04em',
          marginLeft: '6px', 
          marginTop: '-4px',
          color: '#FFFFFF', 
        };

        const infoTextStyle: React.CSSProperties  = {
          fontFamily: 'Inter, sans-serif',
          fontWeight: '400',
          fontSize: '14px', 
          textAlign: 'left',
          lineHeight: '118%',
          letterSpacing: '-0.02em', 
          marginLeft: '9px',
          marginTop: '30px',
          color: '#000000', 
        };

  // Conditional rendering för att hantera tomma dataobjekt
    if (!job || !job.headline || !job.employer || !job.employer.name || !job.application_deadline) {
      return <p>Ingen jobbinfo tillgänglig!</p>;
    }

  return (
    <div style={jobStyle}>
      <div style={innerDivStyle}></div>
      <div style={topLeftBoxStyle}>
        <div style={innerTopLeftBarStyle}></div>
        <div style={innerTextStyle}>

          <p>{job.headline}</p>
        
          <p style={{...infoTextStyle, marginTop: '35px', marginLeft: '-4px' }}>{job.workplace_address?.city ?? 'Plats ej tillgänglig'}</p>
        </div>
      </div>
      <p style={{...infoTextStyle, marginTop: '55px', fontWeight: 'bold'}}>
        {job.employer?.name ?? 'Företagsnamn ej tillgängligt'}
      </p>

      <p style={{...infoTextStyle, marginTop: '30px', color: 'grey'}}>
        Sista ansökningsdatum: {formatDate(job.application_deadline)}

      </p>
    </div>
  );
  }
    export default Job;