import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../chatbot/config';
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';
import { Link } from 'react-router-dom';
import './Homepage.css'

const HomePage = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const chatbotRef = useRef(null);

    const toggleChatbot = () => setShowChatbot(!showChatbot);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
                setShowChatbot(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <main>
            <div className="banner">
                <h1>Welcome to the TRA Taxpayer Portal</h1>
                <div className="login-button">
                    <button onClick={() => window.location.href='/login'}>Login</button>
                </div>
                <p>Your gateway to efficient tax management and services.</p>
                <div className="cta-buttons">
                    <button onClick={() => window.location.href='/register'}>Create Taxpayer Account</button>
                    <button onClick={() => window.location.href='/apply-for-tin'}>Apply for TIN</button>
                    <div>
                        <div className="cta-link">
                            <Link to="/find-tin" aria-label="Find Your TIN">Find Your TIN</Link>
                        </div>
                    </div>
                </div>
            </div>
            <section className="about center-text">
                <h2>About the Portal</h2>
                <p>The Tanzania Revenue Authority is committed to efficient revenue collection and taxpayer services. We are looking forward to solving all issues Taxpayers face in a digital mode too. By creating a taxpayer's account you will be able to avail various services from our team digitally. </p>
            </section>
            <section className="how-it-works center-text">
                <h2>How It Works</h2>
                <p>Follow these simple steps to register and manage your taxpayer information:</p>
                <ol className="custom-list">
                    <li>Login with your valid credentials if already having a taxpayer's account.</li>
                    <li>Complete your profile by filling in required details(Valid TIN is required) and we'll notify you upon fulfilling the requirements.</li>
                    <li>You can register for a TIN(TAXPAYER'S IDENTIFICATION NUMBER) if you don't have one or need a new one by clicking on "Apply for TIN".</li>
                    <li>Once you have TIN and create your account then you can perform all services you need.</li>
                </ol>
            </section>
            <section className="news-updates">
                <h2>Latest News and Updates</h2>
                <p>Stay informed with the latest updates from TRA.</p>
                <div className="newsletter" style={{ textAlign: 'left'}}>
                    <h3>Subscribe to our Newsletter</h3>
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
                        <input type="email" placeholder="Enter your email" required aria-required="true" aria-label="Email"/>
                        <button type="submit" style={{ width: 'auto', padding: '0 20px' }}>Subscribe</button>
                    </form>
                </div>
                <div className="social-media">
                    <h3>Follow us on</h3>
                    <div>
                        <a href="Facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                        <a href="Twitter" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FontAwesomeIcon icon={faTwitter} size="2x" />
                        </a>
                        <a href="Instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                    </div>
                </div>
            </section>
            <button className="chatbot-toggle-button" onClick={toggleChatbot}>
                {showChatbot ? 'Hide TRAgpt' : <><FontAwesomeIcon icon={faUserTie} size="2x" /> <strong>Chat with TRAgpt</strong></>}
            </button>
            {showChatbot && (
                <div ref={chatbotRef} className={`chatbot-container ${showChatbot ? '' : 'hidden'}`}>
                    <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
                </div>
            )}
        </main>
    );
};

export default HomePage;
