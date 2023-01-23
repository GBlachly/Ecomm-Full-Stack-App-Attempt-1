import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const LayoutPage = () => {
    
    return (
        <div className='container'>

            <div className='row'>
                <nav className='col-12'>
                    <ul>
                        <li>
                            <Link to='/'>Home Page</Link>
                        </li>
                        <li>
                            <Link to='/products'>Products Page</Link>
                        </li>
                        <li>
                            <Link to='/account'>Account Page</Link>
                        </li>
                        <li>
                            <Link to='/login'>Login Page</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className='row'>
                <div className='col-12'>
                    <Outlet />
                </div> 
            </div>

        </div>
    );
};