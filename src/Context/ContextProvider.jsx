import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext } from 'react';
import auth from './AuthProvider';

export const UserContext = createContext(null)

const ContextProvider = ({children}) => {

    function SignUp (email,password)
    {
        return createUserWithEmailAndPassword(auth ,email,password)
    }

    function Login (email,password)
    {
        return signInWithEmailAndPassword(auth,email,password)
    }

    function LogOut ()
    {
        return signOut(auth)
    }

    const Obj = {
        SignUp,
        Login,
        LogOut
    }
    return (
        <UserContext.Provider value={Obj}>
            {children}
        </UserContext.Provider >
    );
};

export default ContextProvider;