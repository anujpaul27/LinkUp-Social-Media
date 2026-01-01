import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "./AuthProvider";
import axios from "axios";

export const UserContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [CurrentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [DBUser, setDBUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const res = await axios.get(`http://localhost:5000/users/${user.uid}`);
          setDBUser(res.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        console.log("LogOut User");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function SignUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function SignOut() {
    return signOut(auth);
  }

  const Obj = {
    SignUp,
    login,
    SignOut,
    CurrentUser,
    darkMode,
    setDarkMode,
    loading,
    DBUser
  };
  return <UserContext.Provider value={Obj}>{children}</UserContext.Provider>;
};

export default ContextProvider;
