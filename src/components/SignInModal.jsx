
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  

function SignInModal({ onClose }) {
// showUsernameForm → This is a state variable that determines whether the username form is shown (true) or hidden (false).
// setShowUsernameForm → This is a function used to update the showUsernameForm state.
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

//new Date().getTime() → Gets the current time in milliseconds.Example output: 1712001234567
//btoa() → Converts this string into Base64 format (makes it less readable).
//$ inside backticks (``) to insert variables into a string.
  
  const generateToken = () => {
    return btoa(`${username}:${new Date().getTime()}`); 
  };

  const handleLogin = () => {
    if (username === "user" && password === "password123") {
      // Calls the generateToken() function to create a unique login token.
      const token = generateToken();
      //Saves login status in localStorage
      localStorage.setItem("authToken", token); 
      localStorage.setItem("isLoggedIn", "true"); 
      console.log("Token stored in localStorage:", localStorage.getItem("authToken"));
      login(); 

      alert("Login successful!"); 
// Waits for 100ms, then:
// Redirects to the home page (navigate("/"))
// Closes the login form (onClose())
      setTimeout(() => {
        navigate("/"); 
        onClose(); 
      }, 100); 
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Welcome back.</h2>

        {!showUsernameForm ? (
          <>
            <button className="google-btn">Sign in with Google</button>
            <button className="facebook-btn">Sign in with Facebook</button>
            <button className="apple-btn">Sign in with Apple</button>
            <button className="username-btn" onClick={() => setShowUsernameForm(true)}>
              Sign in with Username
            </button>
            <button className="email-btn">Sign in with Email</button>
          </>
        ) : (
          <div className="username-form">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}

        <p>No account? <span className="link">Create one</span></p>
        <p>Forgot email or trouble signing in? < span className="link">Get help</span></p>
      </div>
    </div>
  );
}

export default SignInModal;
