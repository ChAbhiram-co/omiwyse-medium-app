import React from "react";
import { useNavigate } from "react-router-dom";
const SignupModal = ({ onClose }) => {
  const navigate = useNavigate();
  const closeModal = () => {
    onClose(); 
    navigate("/"); 
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={closeModal}>×</span>
        <h2>StoryBook.</h2>
        <button className="google-btn">Sign up with Google</button>
        <button className="facebook-btn">Sign up with Facebook</button>
        <button className="email-btn">Sign up with Email</button>
        <p className="terms-text">
          Click “Sign up” to agree to Medium’s <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
        <a href="/login" className="signin-link">Already have an account? Sign in</a>
      </div>
    </div>
  );
};

export default SignupModal;
