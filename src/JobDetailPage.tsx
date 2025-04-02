import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store'; // Adjust path as needed
import { Job as JobType } from './Job'; // Import the Job interface from Job.tsx
import OpenAI from 'openai'; // Import OpenAI

// --- Mock User Profile (Keep outside component for now) ---
const mockUserProfile = {
  name: "Alex Doe",
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML", "CSS", "MongoDB", "Frontend Development"],
  jobPreferences: {
    area: "Stockholm",
    type: "Frontend Developer",
  },
  cv: {
    summary: "Experienced frontend developer with a passion for creating intuitive user interfaces.",
    // ... other CV sections like experience, education
  },
  templateCoverLetter: "Dear Hiring Manager, I am excited to apply for the [Job Title] position at [Company Name]. My skills in [Skill 1] and [Skill 2] align well with your requirements. I am eager to contribute to your team.",
};
// --- End Mock User Profile ---

// --- Initialize OpenAI Client (outside component) ---
// IMPORTANT: This uses the environment variable for security.
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for frontend usage
});
// --- End OpenAI Client Init ---

function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const job = useSelector((state: RootState) =>
    // Ensure job.id is compared correctly (string vs number)
    state.jobs.entities.find(j => String(j.id) === jobId)
  ) as JobType | undefined; // Type assertion

  // State for letter generation history
  const [letterHistory, setLetterHistory] = useState<string[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [initialError, setInitialError] = useState<string | null>(null);

  // State for refinement input and process
  const [refinementInstructions, setRefinementInstructions] = useState('');
  const [isLoadingRefinement, setIsLoadingRefinement] = useState(false);
  const [refinementError, setRefinementError] = useState<string | null>(null);

  const handleGenerateCoverLetter = async () => {
    if (!job || !job.description?.text) {
      setInitialError("Job description is missing.");
      return;
    }
    if (!openai.apiKey) {
      setInitialError("OpenAI API key is not configured...");
      return;
    }

    setIsLoadingInitial(true);
    setLetterHistory([]); // Reset history
    setInitialError(null);
    setRefinementError(null);
    setRefinementInstructions(''); // Clear instructions

    // Construct the prompt
    const prompt = `
      You are an AI assistant helping a job seeker write a cover letter.
      The user's name is ${mockUserProfile.name}.
      Their key skills are: ${mockUserProfile.skills.join(', ')}.
      Their basic cover letter template is: "${mockUserProfile.templateCoverLetter}"
      They are applying for the position of "${job.headline}" at "${job.employer?.name || 'the company'}".

      Here is the job description:
      --- START JOB DESCRIPTION ---
      ${job.description.text}
      --- END JOB DESCRIPTION ---

      First, detect the primary language of the job description provided above.
      Then, please rewrite the template cover letter to be specifically tailored for this job description. 
      Highlight how the user's skills (${mockUserProfile.skills.join(', ')}) match the requirements in the job description.
      Keep the tone professional and enthusiastic.
      Address it to the "Hiring Manager" if the company name is not available.
      Replace placeholders like [Job Title] and [Company Name] appropriately.
      **IMPORTANT: The final cover letter must be written entirely in the same language that you detected for the job description.**
      The final output should be only the cover letter text, without any preamble or explanation.
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Or "gpt-4" if you have access
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7, // Adjust for creativity vs. factualness
      });

      const result = completion.choices[0]?.message?.content;
      if (result) {
        setLetterHistory([result]); // Start history with the first letter
      } else {
        setInitialError("Failed to generate cover letter. No response from AI.");
      }
    } catch (err: any) {
      console.error("OpenAI API error (Initial):", err);
      setInitialError(`Error generating cover letter: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoadingInitial(false);
    }
  };

  const handleRefineCoverLetter = async () => {
    // Get the latest letter from history
    const latestLetter = letterHistory.length > 0 ? letterHistory[letterHistory.length - 1] : null;

    if (!latestLetter) {
      setRefinementError("Generate the initial letter first.");
      return;
    }
    if (!refinementInstructions.trim()) {
      setRefinementError("Please enter instructions for refinement.");
      return;
    }
    if (!openai.apiKey) {
      setRefinementError("OpenAI API key is not configured...");
      return;
    }

    setIsLoadingRefinement(true);
    setRefinementError(null);

    const refinementPrompt = `
      You are an AI assistant helping refine a cover letter.
      Here is the current version of the cover letter:
      --- START CURRENT LETTER ---
      ${latestLetter} 
      --- END CURRENT LETTER ---

      The user wants the following changes:
      "${refinementInstructions}"

      Please rewrite the current cover letter incorporating the user's instructions.
      Maintain the original language of the cover letter.
      The final output should be only the revised cover letter text, without any preamble or explanation.
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: refinementPrompt }],
        temperature: 0.7,
      });
      const result = completion.choices[0]?.message?.content;
      if (result) {
        // Append the new refined letter to the history
        setLetterHistory(prevHistory => [...prevHistory, result]);
        setRefinementInstructions(''); // Clear instructions after successful refinement
      } else {
        setRefinementError("Failed to refine cover letter. No response from AI.");
      }
    } catch (err: any) {
      console.error("OpenAI API error (Refinement):", err);
      setRefinementError(`Error refining cover letter: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoadingRefinement(false);
    }
  };

  if (!job) {
    return <div>Loading job details... or Job not found.</div>;
  }

  // Basic styling, can be expanded using Tailwind or CSS modules
  const pageStyle: React.CSSProperties = {
    padding: '20px',
    maxWidth: '1024px',
    margin: '20px auto',
    backgroundColor: '#ffffff', // Use existing styles/colors if available
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif', // Match existing font
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: '1px solid #eee',
    marginBottom: '20px',
    paddingBottom: '10px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333', // Adjust color to match theme
  };

  const companyStyle: React.CSSProperties = {
    fontSize: '18px',
    color: '#555',
    marginBottom: '10px',
  };

  const locationStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#777',
    marginBottom: '20px',
  };

  const descriptionStyle: React.CSSProperties = {
    lineHeight: '1.6',
    color: '#444',
    marginBottom: '30px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#D3E0D1', // Use a color from the existing theme (e.g., Categories background)
    color: 'black',
    border: '1px solid black',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const generatedLetterStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '15px',
    border: '1px dashed #ccc',
    backgroundColor: '#f9f9f9',
    whiteSpace: 'pre-wrap',
    marginBottom: '15px', // Add margin between history items
  };

  const errorStyle: React.CSSProperties = {
    color: 'red',
    marginTop: '10px',
  };

  const refinementSectionStyle: React.CSSProperties = {
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  };

  const textareaStyle: React.CSSProperties = {
    width: '98%', // Adjust width as needed
    minHeight: '60px',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontFamily: 'inherit',
    fontSize: '14px',
  };

  const latestLetter = letterHistory.length > 0 ? letterHistory[letterHistory.length - 1] : null;

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>{job.headline || 'Job Title Not Available'}</h1>
        <p style={companyStyle}>{job.employer?.name || 'Company Name Not Available'}</p>
        <p style={locationStyle}>{job.workplace_address?.municipality || job.workplace_address?.city || 'Location Not Available'}</p>
      </div>

      {/* Displaying other details - adjust based on available data */}
      {job.occupation?.label && <p><strong>Occupation:</strong> {job.occupation.label}</p>}
      {job.occupation_field?.label && <p><strong>Occupation Field:</strong> {job.occupation_field.label}</p>}
      {job.working_hours_type?.label && <p><strong>Work Time:</strong> {job.working_hours_type.label}</p>}
      {job.application_deadline && <p><strong>Application Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}</p>}

      <div style={descriptionStyle}>
        <h2>Job Description</h2>
        <p>{job.description?.text || 'Full job description not available.'}</p>
      </div>

      {/* Initial Generation Button */}
      <button style={buttonStyle} onClick={handleGenerateCoverLetter} disabled={isLoadingInitial || isLoadingRefinement}>
        {isLoadingInitial ? 'Generating...' : (letterHistory.length > 0 ? 'Start New Letter' : 'Generate Cover Letter')}
      </button>

      {initialError && letterHistory.length === 0 && <p style={errorStyle}>{initialError}</p>}

      {/* Letter History Display */}
      {letterHistory.map((letter, index) => (
        <div key={index} style={generatedLetterStyle}>
          <h3>{index === 0 ? 'Generated Cover Letter:' : `Revision ${index}:`}</h3>
          <p>{letter}</p>
        </div>
      ))}

      {/* Refinement Section (Show only if there is a letter in history) */}
      {letterHistory.length > 0 && (
        <div style={refinementSectionStyle}>
          <h4>Refine Latest Version:</h4>
          <textarea
            style={textareaStyle}
            placeholder="Enter instructions to change the latest version (e.g., make it more formal...)"
            value={refinementInstructions}
            onChange={(e) => setRefinementInstructions(e.target.value)}
            disabled={isLoadingInitial || isLoadingRefinement} // Disable while any loading
          />
          <button style={buttonStyle} onClick={handleRefineCoverLetter} disabled={isLoadingRefinement || isLoadingInitial}>
            {isLoadingRefinement ? 'Refining...' : 'Refine Letter'}
          </button>
          {refinementError && <p style={errorStyle}>{refinementError}</p>}
        </div>
      )}
    </div>
  );
}

export default JobDetailPage; 