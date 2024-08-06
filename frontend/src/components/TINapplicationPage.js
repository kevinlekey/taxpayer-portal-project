import React, { useState } from 'react';

const TINApplicationPage = () => {
    const [applicationType, setApplicationType] = useState(''); 
    const [formData, setFormData] = useState({
        fullName: '',
        nin: '',
        email: '',
        businessName: '',
        businessAddress: '',
        reasonForApplication: 'new'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTypeChange = (e) => {
        setApplicationType(e.target.value);
        setFormData({
            fullName: '',
            nin: '',
            email: '',
            businessName: '',
            businessAddress: '',
            reasonForApplication: 'new'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/tin-applications/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    applicationType: applicationType.toUpperCase()
                }),
            });
    
            if (response.ok) {
                alert('Application submitted successfully!');
            } else {
                const errorData = await response.json();
                if (errorData.messages) {
                    alert(`Failed to submit application: ${errorData.messages.join(', ')}`);
                } else {
                    alert('Failed to submit application. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleCheckStatus = async () => {
        const { fullName, nin } = formData;
    
        try {
            const response = await fetch(`http://localhost:8080/api/tin-applications/status?fullName=${fullName}&nin=${nin}`, {
                method: 'GET',
            });

            if (response.ok) {
                const status = await response.text();
                alert(`Application status: ${status}`);
            } else {
                alert('Failed to check application status. Please check your input and try again.');
            }
        } catch (error) {
            console.error('Error checking application status:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div style={{ backgroundColor: 'yellow', margin: '20px', padding: '20px' }}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minheight: 'cal(100vh - 200px)', padding: '20px' }}>
                <div>
                    <h1>Apply for a Tax Identification Number (TIN)</h1>
                    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto'}}>
                        <div>
                            <label>
                                Application Type:
                                <select name="applicationType" value={applicationType} onChange={handleTypeChange} required arial-required="true">
                                    <option value="">Select...</option>
                                    <option value="individual">Individual</option>
                                    <option value="entity">Entity</option>
                                </select>
                            </label>
                        </div>
                        {applicationType && (
                            <>
                                <div>
                                    <label>
                                        Full Name:
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required arial-required="true" arial-label="Full Name"/>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        NIN(National Identification Number):
                                        <input type="text" name="nin" value={formData.nin} onChange={handleChange} required arial-required="true" arial-label="NIN"/>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Email:
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required arial-required="true" arial-label="Email"/>
                                    </label>
                                </div>
                                {applicationType === 'entity' && (
                                    <>
                                        <div>
                                            <label>
                                                Business Name:
                                                <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required arial-required="true" aria-label="Business Name"/>
                                            </label>    
                                        </div>
                                        <div>
                                            <label>
                                                Business Address:
                                                <input type="text" name="businessAddress" value={formData.businessAddress} onChange={handleChange} required arial-required="true" aria-label="Business Address"/>
                                            </label>
                                        </div>
                                    </>
                                )}
                                <p>
                                    For any queries regarding the TIN application or checking for the application status, please visit our <a href="/contact">contact page</a> and write a message with the subject <strong>"Check TIN Application Status"</strong> and include applicant's <strong>full name</strong> and <strong>NIN</strong>.
                                </p>
                                <button type="submit" >Submit Application</button>
                                <button type="button" onClick={handleCheckStatus}>Check Application Status</button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TINApplicationPage;