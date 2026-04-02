import React from 'react';
import './Pricing.css'; // Import your CSS file for styling

const Pricing = () => {
    return (
        <div className="pricing-container">
            <h1>Choose Your Plan</h1>
            <div className="pricing-grid">
                <div className="pricing-tier">
                    <h2>Mom/Homeowner</h2>
                    <p>$15/month</p>
                    <button className="cta-button">Choose Plan</button>
                </div>
                <div className="pricing-tier">
                    <h2>Pro/Handyman</h2>
                    <p>$30/month</p>
                    <button className="cta-button">Choose Plan</button>
                </div>
                <div className="pricing-tier">
                    <h2>Company/Corporation</h2>
                    <p>$80/month</p>
                    <button className="cta-button">Choose Plan</button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;