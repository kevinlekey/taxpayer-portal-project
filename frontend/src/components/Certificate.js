import React from 'react';
import './Certificate.css';

const Certificate = ({ fullName, nin, tin, createdAt }) => {
  const generateUniqueNumber = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const startDate = new Date(createdAt);
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 5);

  return (
    <div className="certificate">
      <div className="watermark">DEMO</div>
      <div className="seal">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpeeBCmxASIAIJS-fOf4j0SNbCy3JxsetLKA&s" alt="Demo Seal" />
      </div>
      <h1>Certificate</h1>
      <p>This certifies that</p>
      <h2>{fullName}</h2>
      <p>with National Identification Number (NIN)</p>
      <h3>{nin}</h3>
      <p>has the following Tax Identification Number (TIN)</p>
      <h3>{tin}</h3>
      <p>Valid from: {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}</p>
      <p>Issued on: {new Date().toLocaleDateString()}</p>
      <div className="signature">
        <img src="https://signaturely.com/wp-content/uploads/2020/04/richard-branson-signature-signaturely.png" alt="Demo Signature" />
        <p>DEMO COMMISSIONER</p>
      </div>
      <p className="certificate-number">Certificate No: {generateUniqueNumber()}</p>
    </div>
  );
};

export default Certificate;