import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
        tin: '',
        firstName: '',
        middleName: '',
        surname: '',
        dateOfBirth: '',
        nationality: '',
        idType: '',
        idNumber: '',
        employmentStatus: '',
        spouseName: '',
        spouseTin: '',
        residentialAddress: '',
        postalAddress: '',
        countryCode: '',
        mobilePhone: '',
        email: '',
        employerName: '',
        employerTin: '',
        businessCommencementDate: '',
        numberOfEmployees: '',
        estimatedAnnualTurnover: '',
        mainEconomicActivity: '',
        otherEconomicActivities: '',
        bankName: '',
        bankBranch: '',
        bankAccountNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const registerTaxpayer = async (taxpayerData) => {
        const response = await fetch('http://localhost:8080/api/taxpayers/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taxpayerData),
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }
        
        return response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await registerTaxpayer(formData);
            console.log('Registration successful:', response);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            {error && <p className="error-message">{error}</p>}
            <div className="register-container">
                <h1>Taxpayer Account Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="tin">TIN *</label>
                        <input
                            type="text"
                            id="tin"
                            name="tin"
                            value={formData.tin}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="address-container">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="middleName">Middle Name *</label>
                            <input
                                type="text"
                                id="middleName"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname *</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth *</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nationality">Nationality</label>
                        <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="idType">ID Type *</label>
                        <select
                            id="idType"
                            name="idType"
                            value={formData.idType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select ID Type</option>
                            <option value="national_id">National ID</option>
                            <option value="driving_license">Driving License</option>
                            <option value="passport">Passport</option>
                            <option value="voters_card">Voter's Card</option>
                        </select>
                    </div>
                    {formData.idType && (
                        <div className="form-group">
                            <label htmlFor="idNumber">ID Number</label>
                            <input
                                type="text"
                                id="idNumber"
                                name="idNumber"
                                value={formData.idNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Marital Status *</label>
                        <div className="horizontal-options">
                            <label>
                                <input
                                    type="radio"
                                    name="maritalStatus"
                                    value="married"
                                    checked={formData.maritalStatus === 'married'}
                                    onChange={handleChange}
                                    required
                                /> 
                                <span>Married</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="maritalStatus"
                                    value="unmarried"
                                    checked={formData.maritalStatus === 'unmarried'}
                                    onChange={handleChange}
                                    required
                                /> 
                                <span>Unmarried</span>
                            </label>
                        </div>
                    </div>
                    {formData.maritalStatus === 'married' && (
                        <>
                            <div className="address-container">
                                <div className="form-group">
                                    <label htmlFor="spouseName">Spouse Name *</label>
                                    <input
                                        type="text"
                                        id="spouseName"
                                        name="spouseName"
                                        value={formData.spouseName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="spouseTin">Spouse TIN *</label>
                                    <input
                                        type="text"
                                        id="spouseTin"
                                        name="spouseTin"
                                        value={formData.spouseTin}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label>Employment Status *</label>
                        <div className="horizontal-options">
                            <label>
                                <input
                                    type="radio"
                                    name="employmentStatus"
                                    value="employed"
                                    checked={formData.employmentStatus === 'employed'}
                                    onChange={handleChange}
                                    required
                                />
                                <span>Employed</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="employmentStatus"
                                    value="self-employed"
                                    checked={formData.employmentStatus === 'self-employed'}
                                    onChange={handleChange}
                                    required
                                />
                                <span>Self-Employed</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="employmentStatus"
                                    value="unemployed"
                                    checked={formData.employmentStatus === 'unemployed'}
                                    onChange={handleChange}
                                    required
                                />
                                <span>Unemployed</span>
                            </label>
                        </div>
                    </div>
                    {formData.employmentStatus === 'employed' && (
                        <>
                            <div className="address-container">
                                <div className="form-group">
                                    <label htmlFor="employerName">Employer Name *</label>
                                    <input
                                        type="text"
                                        id="employerName"
                                        name="employerName"
                                        value={formData.employerName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="employerTin">Employer TIN *</label>
                                    <input
                                        type="text"
                                        id="employerTin"
                                        name="employerTin"
                                        value={formData.employerTin}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {formData.employmentStatus === 'self-employed' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="businessCommencementDate">Business Commencement Date *</label>
                                <input
                                    type="date"
                                    id="businessCommencementDate"
                                    name="businessCommencementDate"
                                    value={formData.businessCommencementDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="estimatedAnnualTurnover">Estimated Annual Turnover(Tsh.) *</label>
                                <input
                                    type="number"
                                    id="estimatedAnnualTurnover"
                                    name="estimatedAnnualTurnover"
                                    value={formData.estimatedAnnualTurnover}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    {formData.employmentStatus === 'unemployed' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="mainEconomicActivity">Main Economic Activity *</label>
                                <input
                                    type="text"
                                    id="mainEconomicActivity"
                                    name="mainEconomicActivity"
                                    value={formData.mainEconomicActivity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="otherEconomicActivities">Other Economic Activities</label>
                                <input
                                    type="text"
                                    id="otherEconomicActivities"
                                    name="otherEconomicActivities"
                                    value={formData.otherEconomicActivities}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="estimatedAnnualTurnover">Estimated Annual Turnover(Tsh.) *</label>
                                <input
                                    type="number"
                                    id="estimatedAnnualTurnover"
                                    name="estimatedAnnualTurnover"
                                    value={formData.estimatedAnnualTurnover}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    <div className="address-container">
                        <div className="form-group">
                            <label htmlFor="residentialAddress">Residential Address *</label>
                            <input
                                type="text"
                                id="residentialAddress"
                                name="residentialAddress"
                                value={formData.residentialAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalAddress">Postal Address </label>
                            <input
                                type="text"
                                id="postalAddress"
                                name="postalAddress"
                                value={formData.postalAddress}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="address-container">
                        <div className="form-group phone-input-container">
                            <label htmlFor="mobilePhone">Mobile Phone *</label>
                            <div>
                            <input
                                type="tel"
                                id="mobilePhone"
                                name="mobilePhone"
                                value={formData.mobilePhone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bankName">Bank Name *</label>
                        <input
                            type="text"
                            id="bankName"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bankAccountNumber">Bank Account Number *</label>
                        <input
                            type="text"
                            id="bankAccountNumber"
                            name="bankAccountNumber"
                            value={formData.bankAccountNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="cta-buttons">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;