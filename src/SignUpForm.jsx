import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Adjust the path as necessary

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth(); // Use the signup function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password); // Attempt to sign up with email and password
      // Handle post-sign-up actions (e.g., redirect to a welcome page)
    } catch (error) {
      console.error("Failed to create an account:", error);
      // Optionally, handle errors in the UI (e.g., show a message)
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
