import React from 'react';
import './Footer.css';
import footer_logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faWhatsapp, faTelegram, faInstagram, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="Pharmaca logo" />
        <p>Pharmaca</p>
      </div>
      <ul className="footer-links">
        <li>
        <Link to="/groups" style={{color:"white",textDecoration:"none"}}>Study Groups</Link>
          </li>
        <li>
        <Link to="/contact" style={{color:"white",textDecoration:"none"}}>Jobs</Link>
        </li>
        <li>
        <Link to="/contact" style={{color:"white",textDecoration:"none"}}>Data Flow</Link>
        </li>
        <li>
          <Link to="/interview" style={{color:"white",textDecoration:"none"}}>Interviews</Link>
        </li>
        <li>
          <Link to="/contact" style={{color:"white",textDecoration:"none"}}>Contact</Link>
        </li>
        <li>
        <Link to="/contact" style={{color:"white",textDecoration:"none"}}>About</Link>
        </li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://t.me/pharmaca1" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTelegram} />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://x.com/Pharmaca_" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://wa.me/0201013645455" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.youtube.com/@mohamedmansour8816" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>CopyRight @ 2024 - All Rights reserved</p>
      </div>
    </div>
  )
}

export default Footer;
