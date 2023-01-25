import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getUserInfo } from './userSlice';

export const User = () => {
    const user = useSelector(selectUser); 
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getUserInfo());
    };

    return (
        <div className=''>
            <h1>User Container</h1>
            <button onClick={handleClick} >Get User Info</button>
            <h2>{user.username}</h2>
            <h2>{user.email}</h2>
        </div>
    );
};