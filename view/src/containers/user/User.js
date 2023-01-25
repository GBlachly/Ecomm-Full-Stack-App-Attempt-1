import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getUserInfo } from './userSlice';

export const User = () => {
    const user = useSelector(selectUser); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    return (
        <div className=''>
            <h1>User Container</h1>
            <h2>{user.username}</h2>
            <h2>{user.email}</h2>
        </div>
    );
};