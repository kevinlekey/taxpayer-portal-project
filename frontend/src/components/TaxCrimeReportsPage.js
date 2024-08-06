import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const TaxCrimeReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState({ reporterId: '', description: '', reportedAt: '' });

    const baseUrl = 'http://localhost:8085';

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/reports`);
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const handleAddReport = async () => {
        try {
            const response = await axios.post(`${baseUrl}/api/reports`, newReport);
            setReports([...reports, response.data]);
            setNewReport({ reporterId: '', description: '', reportedAt: '' });
        } catch (error) {
            console.error('Error adding report:', error);
        }
    };

    const handleDeleteReport = async (id) => {
        try {
            await axios.delete(`${baseUrl}/api/reports/${id}`);
            setReports(reports.filter(report => report.id !== id));
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    return (
        <div className="tax-crime-reports-page">
            <h2>Tax Crime Reports</h2>
            <div className="add-report">
                <input
                    type="text"
                    value={newReport.reporterId}
                    onChange={(e) => setNewReport({ ...newReport, reporterId: e.target.value })}
                    placeholder="Enter reporter ID"
                />
                <input
                    type="text"
                    value={newReport.description}
                    onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                    placeholder="Enter report description"
                />
                <input
                    type="datetime-local"
                    value={newReport.reportedAt}
                    onChange={(e) => setNewReport({ ...newReport, reportedAt: e.target.value })}
                />
                <button onClick={handleAddReport}>
                    <FontAwesomeIcon icon={faPlus} /> Add Report
                </button>
            </div>
            <ul className="reports-list">
                {reports.map(report => (
                    <li key={report.id} className="report-item">
                        {report.reporterId} - {report.description} - {report.reportedAt}
                        <button onClick={() => handleDeleteReport(report.id)}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaxCrimeReportsPage;