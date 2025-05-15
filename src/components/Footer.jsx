import React from "react";
import { Link } from "react-router-dom"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Help</a>
          <a href="#">Terms</a>
          <Link to="/users">Data</Link> 
          <a href="#">Contact</a>
        </div>
        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
        <p className="footer-text">© 2025 Medium Clone. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
