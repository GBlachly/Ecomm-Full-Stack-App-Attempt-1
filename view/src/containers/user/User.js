import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';

export const User = () => {
    const user = useSelector(selectUser); 

    return (
        <div className=''>
            <h1>User Container</h1>
            <h2>{user.username}</h2>
            <h2>{user.email}</h2>
        </div>
    );
};