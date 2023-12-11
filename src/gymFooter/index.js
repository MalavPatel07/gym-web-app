import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from "../images/logo.png"
function Footer() {
  return (
    <footer id="footer">
      <div className="footer container-fluid py-3 px-sm-3 px-md-5 text-white">
        <div className="row pt-5">
          <div className="col-lg-3 col-md-6 mb-5">
            <img src={logo} alt="Logo" className="footer-logo" />
          </div>

          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-primary mb-4">Get In Touch</h4>
            <p><FontAwesomeIcon icon="map-marker-alt" className="mr-2" />123 Street, New York, USA</p>
            <p><FontAwesomeIcon icon="phone-alt" className="mr-2" />+012 345 67890</p>
            <p><FontAwesomeIcon icon="envelope" className="mr-2" />info@example.com</p>
            <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width: '40px', height: '40px'}} href="https://twitter.com/">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width: '40px', height: '40px'}} href="https://facebook.com/">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width: '40px', height: '40px'}} href="https://linkedin.com/">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{width: '40px', height: '40px'}} href="https://instagram.com/">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>

          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-primary mb-4">Opening Hours</h4>
            <h5 className="text-white">Monday - Friday</h5>
            <p>8.00 AM - 8.00 PM</p>
            <h5 className="text-white">Saturday - Sunday</h5>
            <p>2.00 PM - 8.00 PM</p>
          </div>
        </div>
        <div className="container border-top border-dark pt-5">
          <p className="m-0 text-center text-white">
            &copy; <Link className="text-white font-weight-bold" to="/">CrossFit</Link>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
