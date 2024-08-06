import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faIdCard, faCalculator, faPercent, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const DashboardPage = () => {
  const services = [
    { name: 'File Tax Returns', icon: faFileAlt, link: '/file-tax-returns' },
    { name: 'Driving License', icon: faIdCard, link: '/driving-license' },
    { name: 'VFD/EFD', icon: faCalculator, link: '/vfd-efd' },
    { name: 'VAT', icon: faPercent, link: '/vat' },
    { name: 'Report Tax Crime', icon: faExclamationTriangle, link: '/report-tax-crime' }
  ];

  return (
    <div className="dashboard">
      <h2>SERVICES</h2>
      <div className="service-grid">
        <div className="service-row">
          <Link to={services[0].link} className="service-item">
            <FontAwesomeIcon icon={services[0].icon} className="service-icon" />
            <span className="service-name">{services[0].name}</span>
          </Link>
          <Link to={services[1].link} className="service-item">
            <FontAwesomeIcon icon={services[1].icon} className="service-icon" />
            <span className="service-name">{services[1].name}</span>
          </Link>
          <Link to={services[2].link} className="service-item">
            <FontAwesomeIcon icon={services[2].icon} className="service-icon" />
            <span className="service-name">{services[2].name}</span>
          </Link>
        </div>
        <div className="service-row">
          <Link to={services[3].link} className="service-item">
            <FontAwesomeIcon icon={services[3].icon} className="service-icon" />
            <span className="service-name">{services[3].name}</span>
          </Link>
          <Link to={services[4].link} className="service-item">
            <FontAwesomeIcon icon={services[4].icon} className="service-icon" />
            <span className="service-name">{services[4].name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
