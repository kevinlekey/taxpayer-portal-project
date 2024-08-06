import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VfdEfdPage.css';

const VfdEfdPage = () => {
    const [receipts, setReceipts] = useState([]);
    const [newReceipt, setNewReceipt] = useState({
        receiptId: '',
        amount: '',
        issuedAt: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = 'http://localhost:8084/api/receipts';

    useEffect(() => {
        fetchReceipts();
    }, []);

    const fetchReceipts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(baseUrl);
            setReceipts(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching receipts:', error);
            setError('Failed to load receipts. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReceipt({ ...newReceipt, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newReceipt.receiptId.trim() || !newReceipt.amount) return;

        try {
            setLoading(true);
            const response = await axios.post(baseUrl, {
                ...newReceipt,
                amount: parseFloat(newReceipt.amount),
                issuedAt: newReceipt.issuedAt || new Date().toISOString()
            });
            setReceipts([...receipts, response.data]);
            setNewReceipt({ receiptId: '', amount: '', issuedAt: '' });
            setError(null);
        } catch (error) {
            console.error('Error creating receipt:', error);
            setError('Failed to create receipt. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${baseUrl}/${id}`);
            setReceipts(receipts.filter(receipt => receipt.id !== id));
            setError(null);
        } catch (error) {
            console.error('Error deleting receipt:', error);
            setError('Failed to delete receipt. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vfd-efd-service-page">
            <h1 className="page-title">VFD EFD Service</h1>
            
            <section className="create-receipt">
                <h2>Create Receipt</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="receiptId"
                        value={newReceipt.receiptId}
                        onChange={handleInputChange}
                        placeholder="Receipt ID"
                        required
                    />
                    <input
                        type="number"
                        name="amount"
                        value={newReceipt.amount}
                        onChange={handleInputChange}
                        placeholder="Amount"
                        required
                    />
                    <input
                        type="datetime-local"
                        name="issuedAt"
                        value={newReceipt.issuedAt}
                        onChange={handleInputChange}
                        placeholder="Issued At"
                    />
                    <div className="cta-buttons">
                        <button type="submit" className="add-button" disabled={loading}>Create</button>
                    </div>
                </form>
            </section>

            <section className="receipt-list">
                <h2>Receipt List</h2>
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {receipts.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Receipt ID</th>
                                <th>Amount</th>
                                <th>Issued At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map((receipt) => (
                                <tr key={receipt.id}>
                                    <td>{receipt.receiptId}</td>
                                    <td>${receipt.amount.toFixed(2)}</td>
                                    <td>{new Date(receipt.issuedAt).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => handleDelete(receipt.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No receipts found.</p>
                )}
            </section>
        </div>
    );
};

export default VfdEfdPage;