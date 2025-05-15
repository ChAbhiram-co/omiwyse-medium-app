import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupModal from "./SignupModal";
import SignInModal from "./SignInModal";

function Header({ isLoggedIn, setSearchText }) {
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);
  const navigate = useNavigate();

  //console.log(typeof isLoggedIn);

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">Story book</Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">Our Story</Link>
          <Link to="/membership">Membership</Link>
          <Link to="/Jokes">jokes</Link>
          <Link to="/Weather">weather</Link>
          
        </nav>

        <div className="right-section">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setSearchText(e.target.value)}
            
          />

          {isLoggedIn === "true" ? (
            <>
              <button
                className="sign-in"
                onClick={() => navigate("/new-story")}
              >
                Write
              </button>
              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.setItem("isLoggedIn", "false");
                  alert("You sure you want to logout?");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="sign-in" onClick={() => setSignInOpen(true)}>
                Sign In
              </button>
              <button
                className="get-started"
                onClick={() => setSignupOpen(true)}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </header>

      {isSignupOpen && <SignupModal onClose={() => setSignupOpen(false)} />}

      {isSignInOpen && <SignInModal onClose={() => setSignInOpen(false)} />}
    </>
  );
}

export default Header;
