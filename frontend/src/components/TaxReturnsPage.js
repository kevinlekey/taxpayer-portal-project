import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './TaxReturnsPage.css';

const TaxReturnsPage = () => {
    const [taxReturns, setTaxReturns] = useState([]);
    const [newTaxReturn, setNewTaxReturn] = useState({
        taxpayerName: '',
        tin: '',
        income: 0,
        taxAmount: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = 'http://localhost:8081';

    useEffect(() => {
        fetchTaxReturns();
    }, []);

    const fetchTaxReturns = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/api/tax-returns`);
            console.log('Fetched tax returns:', response.data);
            setTaxReturns(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching tax returns:', error);
            setError('Failed to load tax returns. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTaxReturn(prev => ({
            ...prev,
            [name]: name === 'income' || name === 'taxAmount' ? parseFloat(value) : value
        }));
    };

    const handleAddTaxReturn = async (e) => {
        e.preventDefault();
        if (!newTaxReturn.taxpayerName.trim()) return;

        try {
            const response = await axios.post(`${baseUrl}/api/tax-returns`, newTaxReturn);
            console.log('Response:', response.data);
            setTaxReturns([...taxReturns, response.data]);
            setNewTaxReturn({
                taxpayerName: '',
                tin: '',
                income: 0,
                taxAmount: 0
            });
        } catch (error) {
            console.error('Error adding tax return:', error);
            setError('Failed to add tax return. Please try again.');
        }
    };

    const handleDeleteTaxReturn = async (id) => {
        try {
            await axios.delete(`${baseUrl}/api/tax-returns/${id}`);
            setTaxReturns(taxReturns.filter(taxReturn => taxReturn.id !== id));
        } catch (error) {
            console.error('Error deleting tax return:', error);
            setError('Failed to delete tax return. Please try again.');
        }
    };

    if (loading) {
        return <div className="loading"><FontAwesomeIcon icon={faSpinner} spin /> Loading...</div>;
    }

    return (
        <div className="tax-returns-page">
            <h2>Tax Returns</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="add-tax-return" onSubmit={handleAddTaxReturn}>
                <input
                    type="text"
                    name="taxpayerName"
                    value={newTaxReturn.taxpayerName}
                    onChange={handleInputChange}
                    placeholder="Enter Taxpayer Name"
                    className="tax-return-input"
                />
                <input
                    type="text"
                    name="tin"
                    value={newTaxReturn.taxpayerId}
                    onChange={handleInputChange}
                    placeholder="Enter TIN"
                    className="tax-return-input"
                />
                <input
                    type="number"
                    name="income"
                    value={newTaxReturn.income}
                    onChange={handleInputChange}
                    placeholder="Enter income"
                    className="tax-return-input"
                />
                <input
                    type="number"
                    name="taxAmount"
                    value={newTaxReturn.taxAmount}
                    onChange={handleInputChange}
                    placeholder="Enter tax amount"
                    className="tax-return-input"
                />
                <div className="cta-buttons">
                    <button type="submit" className="add-button">
                        <FontAwesomeIcon icon={faPlus} /> Add Tax Return
                    </button>
                </div>
            </form>
            {taxReturns.length > 0 ? (
                <ul className="tax-returns-list">
                    {taxReturns.map(taxReturn => (
                        <li key={taxReturn.id} className="tax-return-item">
                            <span>{taxReturn.taxpayerName} (ID: {taxReturn.taxpayerId})</span>
                            <span>Income: ${taxReturn.income.toFixed(2)}</span>
                            <span>Tax: ${taxReturn.taxAmount.toFixed(2)}</span>
                            <button onClick={() => handleDeleteTaxReturn(taxReturn.id)} className="delete-button">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-returns">No tax returns found. Add one to get started!</p>
            )}
        </div>
    );
};

export default TaxReturnsPage;