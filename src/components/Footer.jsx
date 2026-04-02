import React from 'react';
import HelpModal from '../components/HelpModal';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <HelpModal />
            <div className="copyright">
                &copy; {new Date().getFullYear()} Ayxproject. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;