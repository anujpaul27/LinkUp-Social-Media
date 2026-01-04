import React from 'react';
import { useLoaderData } from 'react-router';

const OtherProfile = ({uid}) => {
    const user = useLoaderData()
    console.log(user);
    return (
        <div>
            this is to the other people area 
        </div>
    );
};

export default OtherProfile;