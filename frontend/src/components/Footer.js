import React from 'react';

const Footer = () => (
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
        <footer>
            <div className="container">
                <p>&copy; Tanzania Revenue Authority. All rights reserved.</p>
                <ul>
                    <li><a href="/privacy-policy" arial-label="Privacy Policy">Privacy Policy</a></li>
                    <li><a href="/terms-of-service" arial-label="Terms of Service">Terms of Service</a></li>
                </ul>
            </div>
        </footer>
    </>
);

export default Footer;
