import React, { useState } from 'react';
import Certificate from './Certificate';

const TINSearchPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        nin: ''
    });
    const [tin, setTIN] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/tin-applications/find-tin?fullName=${formData.fullName}&nin=${formData.nin}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTIN(data.tin);
                setCreatedAt(data.createdAt); 
            } else {
                const errorData = await response.json();
                alert(`Failed to find TIN: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error finding TIN:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const [showCertificate, setShowCertificate] = useState(false);

    const handlePrintCertificate = () => {
        const printContent = document.getElementById('certificate');
        const winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        winPrint.document.write('<html><head><title>Print</title>');
        winPrint.document.write('<link rel="stylesheet" href="/path/to/Certificate.css" type="text/css" />');
        winPrint.document.write('</head><body>');
        winPrint.document.write(printContent.innerHTML);
        winPrint.document.write('</body></html>');
        winPrint.document.close();
        winPrint.focus();
        setTimeout(() => {
            winPrint.print();
            winPrint.close();
        }, 1000);
    };


    return (
        <main>
            <div className="banner">
                <h1>Find Your Tax Identification Number (TIN)</h1>
            </div>
            <section className="center-text">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto' }}>
                    <div>
                        <label>
                            Full Name:
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required aria-required="true" aria-label="Full Name" />
                        </label>
                    </div>
                    <div style={{ flex: 1}}>
                        <label>
                            NIN:
                            <input type="text" name="nin" value={formData.nin} onChange={handleChange} required aria-required="true" aria-label="NIN" />
                        </label>
                    </div>
                    <button type="submit">Find TIN</button>
                </form>
                {tin && (
                    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #000', backgroundColor: '#f9f9f9' }}>
                        <h2>Your TIN</h2>
                        <p>{tin}</p>
                    </div>
                )}


            {tin && showCertificate && (
                <div id="certificate">
                    <Certificate fullName={formData.fullName} nin={formData.nin} tin={tin} createdAt={createdAt}/>
                </div>
                        )}
            
            {tin && (
                <button onClick={() => setShowCertificate(true)}>View Printable Result</button>
            )}
            
            {showCertificate && (
                <button onClick={handlePrintCertificate}>Print Certificate</button>
            )}
            </section>
        </main>
    );
};

export default TINSearchPage;