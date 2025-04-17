import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  const handleFeedbackClick = () => {
    window.open('https://forms.gle/RuzsMdTwqsb1hFHi7', '_blank');
  };

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>We offer healthy and delicious food ordering through an AI assistant. We understand your dietary needs and preferences to create a personalized experience. Partnering with various restaurants, we ensure a wide variety of healthy and tasty options. Join us to fuel your body and develop better eating habits!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>Developed by: Jayesh Muley</li>
            <li>Email: <a href="mailto:jayesh.muley@yahoo.com">jayesh.muley@yahoo.com</a></li>
          </ul>
          <button className="feedback-button" onClick={handleFeedbackClick}>Give Feedback</button>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © NutriVista.com - All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
