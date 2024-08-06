import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <>
            <style>
                {`
                    @media (max-width: 768px) {
                        .container {
                            flex-direction: column;
                            gap: 10px;
                        }
                        .horizontal-nav li{
                            display: inline-block;
                            margin-right: 10px;
                        }
                    }
                `}
            </style>
            <header>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                    <img src="https://www.gskinvestments.co.tz/wp-content/uploads/2024/01/download.png" alt="TRA Logo" className="logo" />
                    <div>
                        <h1 style={{ textDecoration: 'underline',margin: '0'}}>TANZANIA REVENUE AUTHORITY</h1>
                        <p style={{ margin: '0', }}>ISO  9002:  2015 CERTIFIED</p>
                    </div>
                    <nav>
                        <ul className="horizontal-nav">
                            <li><Link to="/" aria-label="Home">Home</Link></li>
                            {!isLoggedIn && <li><Link to="/login" aria-label="Login">Login</Link></li>}
                            {!isLoggedIn && <li><Link to="/register" aria-label="Register">Register</Link></li>}
                            <li><Link to="/contact" arial-label="Contact">Contact</Link></li>
                            {isLoggedIn && (
                                <li>
                                    <div className="cta-buttons">
                                        <button onClick={handleLogout}>Logout</button>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
