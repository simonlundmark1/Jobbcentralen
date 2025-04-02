import React from 'react';
import { Link } from 'react-router-dom';
// import styles from './css/JobStyles.module.css'; // Commenting out if not used

// Updated Job interface to match jobsSlice.tsx and include filterable fields
export interface Job {
  id: string | number; // Keep ID for linking
  headline?: string;
  employer?: {
    name?: string;
  };
  application_deadline?: string;
  workplace_address?: {
    city?: string;
    municipality?: string; // Add municipality for filtering
    country?: string;
  };
  description?: {
    text: string;
    // ... other description fields if needed
  };
  // Add fields used for filtering
  occupation?: { label?: string };
  occupation_field?: { label?: string }; // For Yrke/Occupation Field
  working_hours_type?: { label?: string }; // For Omfattning/Work Extent
  // Add role and level back if they are still used elsewhere or needed for display
  // role?: string;
  // level?: string;
  // location?: string; // replaced by workplace_address
}

// JobType can simply extend Job if no additional props are needed here
export interface JobType extends Job {}

interface JobProps {
  job: JobType;
  index: number;
  isEven: boolean;
}

function formatDate(dateString: string): string {
  const months = [
    'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
    'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
  ];

  const date = new Date(dateString);
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

const Job: React.FC<JobProps> = ({ job, index, isEven }) => {
  const greenShade = 120 - (index * 10); 

  type BoxSizing = "border-box" | "content-box" | undefined;
  type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

  const jobStyle: React.CSSProperties = {
    height: '135px', 
    width: '1012px',
    border: '1px solid black', 
    backgroundColor: isEven ? '#F8F8+8' : '#F8F8+8',
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

  // Updated check to ensure job.id exists for the link
  if (!job || !job.id || !job.headline || !job.employer?.name || !job.application_deadline) {
    console.warn("Job data incomplete for list item, skipping rendering:", job);
    return null; // Render nothing if essential data for list view is missing
  }

  // Determine city/location display - prioritize municipality if available
  const displayLocation = job.workplace_address?.municipality || job.workplace_address?.city || 'Plats ej tillgänglig';

  return (
    <Link to={`/job/${job.id}`} style={{ textDecoration: 'none' }}>
      <div style={jobStyle}>
        <div style={innerDivStyle}></div>
        <div style={topLeftBoxStyle}>
          <div style={innerTopLeftBarStyle}></div>
          <div style={innerTextStyle}>
            <p>{job.headline}</p>
            {/* Use displayLocation */}
            <p style={{...infoTextStyle, marginTop: '35px', marginLeft: '-4px' }}>{displayLocation}</p>
          </div>
        </div>
        <p style={{...infoTextStyle, marginTop: '55px', fontWeight: 'bold'}}>
          {job.employer.name} {/* Already checked employer.name exists */}
        </p>
        <p style={{...infoTextStyle, marginTop: '30px', color: 'grey'}}>
          Sista ansökningsdatum: {formatDate(job.application_deadline)}
        </p>
      </div>
    </Link>
  );
}

export default Job;