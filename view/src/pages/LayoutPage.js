import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const LayoutPage = () => {
    
    return (
        <div className='container-fluid mx-0 my-0 px-0 py-0'>

            <div className='row mx-0 my-0 px-0 py-0'>
                <nav className='col-12 mx-0 my-0 px-0 py-0'>
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

            <div className='row mx-0 my-0 px-0 py-0'>
                <div className='col-12 mx-0 my-0 px-0 py-0'>
                    <Outlet />
                </div> 
            </div>

        </div>
    );
};