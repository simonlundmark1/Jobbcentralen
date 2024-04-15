// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import { User } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });


    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  
  const signout = () => {
    return signOut(auth).then(() => {
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };
  
  

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setCurrentUser(response.user);
      })
      .catch(error => {
        console.error("Error creating new user with email and password:", error);
      });
  };

  const signin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setCurrentUser(response.user);
      })
      .catch(error => {
        console.error("Error signing in with email and password:", error);
      });
  };

  const value = {
    currentUser,
    signup, 
    signin, 
    signout, 

  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
