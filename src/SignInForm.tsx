import React, { useState, FormEvent } from 'react';
import { useAuth as useAuthFromContext } from './AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

interface SignInProps {
  signin: (email: string, password: string) => Promise<void>;
}

const useAuth = (): SignInProps => {
  return { signin: async (email: string, password: string) => { /* implementation here */ } };
};



export default function SignInForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signin } = useAuth();
  const navigate = useNavigate(); 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signin(email, password); 
      console.log("Successfully logged in"); 
      navigate('/'); 

    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-post" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord" required />
      <button type="submit">Logga in</button>
    </form>
  );
}
