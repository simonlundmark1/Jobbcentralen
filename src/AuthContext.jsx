// AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config"; // Adjust the path as necessary

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setCurrentUser(response.user);
        // Additional actions upon successful sign-up, if necessary
      })
      .catch(error => {
        console.error("Error creating new user with email and password:", error);
      });
  };

  // Add the signin function
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setCurrentUser(response.user);
        // Additional actions upon successful sign-in, if necessary
      })
      .catch(error => {
        console.error("Error signing in with email and password:", error);
      });
  };

  // Populate the value provided by the AuthContext
  const value = {
    currentUser,
    signup, // The existing signup function
    signin, // The new signin function
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
