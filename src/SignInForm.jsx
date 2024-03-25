import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password); 
     
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
