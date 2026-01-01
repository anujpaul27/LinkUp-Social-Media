import React, { useContext } from 'react';
import { UserContext } from '../Context/ContextProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {CurrentUser,loading} = useContext(UserContext)
    
    if(loading)
    {
        return <div className='flex items-center justify-center h-screen'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>;
    }

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