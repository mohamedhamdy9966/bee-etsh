import React from 'react';
import './Footer.css';
import footer_logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faWhatsapp, faTelegram, faInstagram, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="Pharmaca logo" />
        <p>Pharmaca</p>
      </div>
      <ul className="footer-links">
        <li>Study Groups</li>
        <li>Courses</li>
        <li>Preparations</li>
        <li>About</li>
        <li>Contact</li>
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
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTelegram} />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
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
