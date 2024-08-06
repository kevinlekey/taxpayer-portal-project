import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [tin, setTin] = useState('');
    const [surname, setSurname] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
    
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tin, surname }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Login successful
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                // Login failed
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="tin">TIN</label>
                    <input
                        type="text"
                        id="tin"
                        name="tin"
                        value={tin}
                        onChange={(e) => setTin(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>
                <div className="cta-buttons">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
