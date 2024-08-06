import React, { useState } from 'react';
import axios from 'axios';
import './VatCalculatorPage.css';

const VatCalculatorPage = () => {
    const [calculation, setCalculation] = useState({
        amount: '',
        vatRate: '',
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleCalculate = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.get('http://localhost:8083/api/vat/calculate-vat', {
                params: {
                    amount: parseFloat(calculation.amount),
                    vatRate: parseFloat(calculation.vatRate)
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error calculating VAT:', error);
            setError('An error occurred while calculating VAT. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCalculation(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="vat-calculator-container">
            <h1>VAT Calculator</h1>
            <form onSubmit={handleCalculate} className="vat-form">
                <div className="form-group">
                    <label htmlFor="amount">Amount (TZS):</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={calculation.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="vatRate">VAT Rate (%):</label>
                    <input
                        type="number"
                        id="vatRate"
                        name="vatRate"
                        value={calculation.vatRate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="calculate-btn">Calculate VAT</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {result && (
                <div className="result-container">
                    <h2>Calculation Result</h2>
                    <table className="result-table">
                        <tbody>
                            <tr>
                                <td>Original Amount:</td>
                                <td>{result.amount.toFixed(2)} TZS</td>
                            </tr>
                            <tr>
                                <td>VAT Rate:</td>
                                <td>{result.vatRate}%</td>
                            </tr>
                            <tr>
                                <td>VAT Amount:</td>
                                <td>{result.vatAmount.toFixed(2)} TZS</td>
                            </tr>
                            <tr className="total-row">
                                <td>Total Amount:</td>
                                <td>{result.totalAmount.toFixed(2)} TZS</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default VatCalculatorPage;