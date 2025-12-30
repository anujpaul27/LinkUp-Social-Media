import React, { createContext } from 'react';

export const UserContext = createContext(null)
const ContextProvider = ({children}) => {
    const Obj = {
        name: 'kanha',
    }
    return (
        <UserContext.Provider value={Obj}>
            {children}
        </UserContext.Provider >
    );
};

export default ContextProvider;