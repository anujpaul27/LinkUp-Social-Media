import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from './AuthProvider';

export const UserContext = createContext(null)

const ContextProvider = ({children}) => {
    const [CurrentUser,setCurrentUser] = useState(null)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>
        {
            if (user)
            {
                setCurrentUser(user);
                // console.log(user);
            }
            else
            {
                console.log('LogOut User');
            }
        });

        return ()=> unsubscribe();
    },[])

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
        LogOut,
        CurrentUser
    }
    return (
        <UserContext.Provider value={Obj}>
            {children}
        </UserContext.Provider >
    );
};

export default ContextProvider;