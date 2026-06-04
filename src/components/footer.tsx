import * as React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LegalDialog from './dialogs/legalDialog';
import { cookiePolicy, privacyPolicy, termOfUse } from '../utils/legalData';

const Footer: React.FC = () => {
    return (
        <footer className="footer">

            <div className="footer-main">

                {/* Brand column */}
                <div className="footer-brand">
                    <h3>The CupCake Factory</h3>
                    <p>
                        Handcrafted with love, baked fresh daily. Over 50 legendary flavors
                        made from scratch — because every bite should feel like a celebration.
                    </p>
                    <div className="footer-social">
                        <Link to='#' aria-label="Facebook"><FacebookIcon /></Link>
                        <Link to='#' aria-label="Instagram"><InstagramIcon /></Link>
                        <Link to='#' aria-label="Twitter"><TwitterIcon /></Link>
                        <Link to='#' aria-label="TikTok"><MusicNoteIcon /></Link>
                    </div>
                </div>

                {/* Explore column */}
                <div className="footer-col">
                    <h4>Explore</h4>
                    <Link to='/'>Home</Link>
                    <Link to='/cupcakes'>Our Cupcakes</Link>
                    <Link to='/menu'>Full Menu</Link>
                    <Link to='/restaurants'>Restaurants</Link>
                </div>

                {/* Company column */}
                <div className="footer-col">
                    <h4>Company</h4>
                    <Link to='/about-us'>About Us</Link>
                    <Link to='/careers'>Careers</Link>
                    <Link to='/login'>Sign In</Link>
                    <Link to='/register'>Create Account</Link>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <p className="footer-copy">
                    © {new Date().getFullYear()} The CupCake Factory. All rights reserved.
                </p>
                <div className="footer-legal">
                    <LegalDialog legalData={termOfUse} />
                    <span className="footer-legal-dot" />
                    <LegalDialog legalData={privacyPolicy} />
                    <span className="footer-legal-dot" />
                    <LegalDialog legalData={cookiePolicy} />
                </div>
            </div>

        </footer>
    );
}

export default Footer;
