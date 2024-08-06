import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faSpinner, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './DrivingLicensePage.css';

const DrivingLicensePage = () => {
    const [licenses, setLicenses] = useState([]);
    const [newLicense, setNewLicense] = useState({
        licenseNumber: '',
        holderName: '',
        holderAddress: '',
        issueDate: '',
        expiryDate: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = 'http://localhost:8082';

    useEffect(() => {
        fetchLicenses();
    }, []);

    const fetchLicenses = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/api/driving-licenses`);
            console.log('Fetched licenses:', response.data);
            setLicenses(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching licenses:', error);
            setError('Failed to load licenses. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLicense(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddLicense = async (e) => {
        e.preventDefault();
        if (!newLicense.licenseNumber.trim()) return;

        try {
            const response = await axios.post(`${baseUrl}/api/driving-licenses/apply`, newLicense);
            console.log('Response:', response.data);
            setLicenses([...licenses, response.data]);
            setNewLicense({
                licenseNumber: '',
                holderName: '',
                holderAddress: '',
                issueDate: '',
                expiryDate: ''
            });
        } catch (error) {
            console.error('Error adding license:', error);
            setError('Failed to add license. Please try again.');
        }
    };

    const handleDeleteLicense = async (id) => {
        try {
            await axios.delete(`${baseUrl}/api/driving-licenses/${id}`);
            setLicenses(licenses.filter(license => license.id !== id));
        } catch (error) {
            console.error('Error deleting license:', error);
            setError('Failed to delete license. Please try again.');
        }
    };

    const handleExtendLicense = async (id) => {
        try {
            const response = await axios.put(`${baseUrl}/api/driving-licenses/extend/${id}?additionalYears=1`);
            setLicenses(licenses.map(license => license.id === id ? response.data : license));
        } catch (error) {
            console.error('Error extending license:', error);
            setError('Failed to extend license. Please try again.');
        }
    };

    if (loading) {
        return <div className="loading"><FontAwesomeIcon icon={faSpinner} spin /> Loading...</div>;
    }

    return (
        <div className="driving-licenses-page">
            <h2>Driving Licenses</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="add-license" onSubmit={handleAddLicense}>
                <input
                    type="text"
                    name="licenseNumber"
                    value={newLicense.licenseNumber}
                    onChange={handleInputChange}
                    placeholder="Enter License Number"
                    className="license-input"
                />
                <input
                    type="text"
                    name="holderName"
                    value={newLicense.holderName}
                    onChange={handleInputChange}
                    placeholder="Enter Holder Name"
                    className="license-input"
                />
                <input
                    type="text"
                    name="holderAddress"
                    value={newLicense.holderAddress}
                    onChange={handleInputChange}
                    placeholder="Enter Holder Address"
                    className="license-input"
                />
                <label>
                    Issue Date:
                    <input
                        type="date"
                        name="issueDate"
                        value={newLicense.issueDate}
                        onChange={handleInputChange}
                        className="license-input"
                    />
                </label>    
                <label>
                    Expiry Date:
                    <input
                        type="date"
                        name="expiryDate"
                        value={newLicense.expiryDate}
                        onChange={handleInputChange}
                        className="license-input"
                    />
                </label>
                <div className="cta-buttons">
                    <button type="submit" className="add-button">
                        <FontAwesomeIcon icon={faPlus} /> Add License
                    </button>
                </div>
            </form>
            {licenses.length > 0 ? (
                <ul className="licenses-list">
                    {licenses.map(license => (
                        <li key={license.id} className="license-item">
                            <span>{license.licenseNumber} - {license.holderName}</span>
                            <span>Address: {license.holderAddress}</span>
                            <span>Issue Date: {license.issueDate}</span>
                            <span>Expiry Date: {license.expiryDate}</span>
                            <button onClick={() => handleExtendLicense(license.id)} className="extend-button">
                                <FontAwesomeIcon icon={faEdit} /> Extend
                            </button>
                            <button onClick={() => handleDeleteLicense(license.id)} className="delete-button">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-licenses">No licenses found. Add one to get started!</p>
            )}
        </div>
    );
};

export default DrivingLicensePage;