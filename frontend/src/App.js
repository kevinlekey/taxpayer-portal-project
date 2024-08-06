import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ContactPage from './components/ContactPage';
import TINApplicationPage from './components/TINapplicationPage';
import DashboardPage from './components/DashboardPage';
import TINSearchPage from './components/TINSearchPage';
import PrivateRoute from './components/PrivateRoute';
import DrivingLicensePage from './components/DrivingLicensePage';
import TaxReturnsPage from './components/TaxReturnsPage';
import TaxCrimeReportsPage from './components/TaxCrimeReportsPage';
import VatCalculatorPage from './components/VatCalculatorPage';
import VfdEfdPage from './components/VfdEfdPage';

const App = () => (
    <Router>
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/apply-for-tin" element={<TINApplicationPage />} />
                <Route path="/find-tin" element={<TINSearchPage />} />
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                } />
                 <Route path="/driving-license" element={
                    <PrivateRoute>
                        <DrivingLicensePage />
                    </PrivateRoute>
                } />
                <Route path="/file-tax-returns" element={
                    <PrivateRoute>
                        <TaxReturnsPage />
                    </PrivateRoute>
                } />
                <Route path="/tax-crime-reports" element={
                    <PrivateRoute>
                        <TaxCrimeReportsPage />
                    </PrivateRoute>
                } />
                <Route path="/vat-calculator" element={
                    <PrivateRoute>
                        <VatCalculatorPage />
                    </PrivateRoute>
                } />
                <Route path="/vfd-efd" element={
                    <PrivateRoute>
                        <VfdEfdPage />
                    </PrivateRoute>
                } />
            </Routes>
            <Footer />
        </div>
    </Router>
);

export default App;
