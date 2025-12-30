import React, { useContext } from 'react';
import { UserContext } from '../Context/ContextProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {CurrentUser} = useContext(UserContext)
    if (CurrentUser)
    {
        return children
    }
    return (
        <div>
            <Navigate to={'/login'}></Navigate>
        </div>
    );
};

export default PrivateRoute;