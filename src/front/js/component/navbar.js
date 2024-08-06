import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Authentication System</span>
                </Link>
                <div className="ml-auto">
                    {token ? (
                        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-primary">Login</button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
