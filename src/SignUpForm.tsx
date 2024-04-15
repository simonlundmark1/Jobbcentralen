import React, { useState, FormEvent } from 'react';
import { useAuth as UseAuthFromContext } from './AuthContext';

interface SignUpProps {
  signup: (email: string, password: string) => Promise<void>;
}

const useAuth = (): SignUpProps => {
  return { signup: async (email: string, password: string) => { /* implementation here */ } };
};

export default function SignUpForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signup } = useAuth(); 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(email, password); /
    } catch (error) {
      console.error("Failed to create an account:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-post"
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Lösenord"
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Registrera
      </button>
    </form>
  );
}
