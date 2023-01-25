import React, { useState } from 'react';

//import { loginUser } from '../containers/user/userSlice';
import { fetchLoginUser } from '../util/api';   //for testing

export const LoginPage = () => {
    let [ username, setUsername ] = useState('');
    let [ password, setPassword ] = useState('');

    const handleUsernameChange = (e) => {
        const usernameInput = e.target.value;
        setUsername(usernameInput);
    }

    const handlePasswordChange = (e) => {
        const passwordInput = e.target.value;
        setPassword(passwordInput);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetchLoginUser(username, password); //for testing
        
        //loginUser(username, password); 
        //setUsername('');
        //setPassword('');
        //somehow change URL to /account if the login is successful
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <form onSubmit={handleSubmit}>
                    
                    <label>Username</label>
                    <input 
                        type='text'
                        name='username' 
                        value={username} 
                        onChange={handleUsernameChange} 
                    />
                    
                    <label style={{marginLeft: 10}} >Password</label>
                    <input 
                        type='password' 
                        name='password'
                        value={password} 
                        onChange={handlePasswordChange} 
                    />
                    
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};