import React from 'react';

const ContactPage = () => (
    <div className="contact-container">
        <h1>Contact Us</h1>
        <div className="contact-details">
            <h2>Contact Information</h2>
            <p>If you have any inquiries or need assistance, please feel free to reach out to us through the following channels:</p>
            <ul>
                <li><strong>Email:</strong> support@tra.go.tz</li>
                <li><strong>Phone:</strong> +255-737-614-658</li>
                <li><strong>Fax:</strong> +255-743-397-193</li>
                <li><strong>Address:</strong>Mapato House-Upanga street, Ilala, Dar-es-Salaam, P.O.BOX 11491</li>
            </ul>
        </div>
        <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name" style={{ }}>Name</label>
                    <input type="text" id="name" name="name" required arial-required="true" arial-label="Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required arial-required="true" arial-label="Email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" required arial-required="true" arial-label="Message"></textarea>
                </div>
                <button type="submit" style={{ padding: '10px 10px', width: '100px' }}>Send</button>
            </form>
        </div>
    </div>
);

export default ContactPage;
