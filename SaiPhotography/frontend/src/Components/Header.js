import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Button } from 'react-bootstrap';
import './../Style/Home.css';

function Home() {
  const { user, setUser } = useContext(UserContext); // Access user state and setUser function from context
  const [showDropdown, setShowDropdown] = useState(false); 
  const navLinkStyle = {
    color: 'white',
    marginLeft: '25px',
    marginRight: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    position: 'relative',
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["./Images/image13.jpg", "./Images/image14.jpg", "./Images/back7.jpg", "./Images/image15.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change images every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  const navContainerStyle = {
    position: 'absolute',
    top: '30px',
    right: '20px',
    zIndex: '1',
    display: 'flex',
    alignItems: 'center',
  };

  const headerStyle = {
    background: `url('${images[currentImageIndex]}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    height: "600px",
  };

  const overlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

  const logoStyle = {
    width: '120px',
    marginLeft: '40px',
    marginTop: '15px'
  };

  const usernameStyle = {
    backgroundColor: '#A38469',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  };

  const handleHovers = (e) => {
    e.target.style.color = "-webkit-linear-gradient(45deg, #fff, #A38469)";
    e.target.style.textDecoration = "underline";
    e.target.style.fontWeight = "bold";
  };

  const handleHover = (e) => {
    e.target.style.textDecoration = 'none';
    e.target.style.color = "#A38469";

    if (e.target.classList.contains('login-box')) {
      e.target.style.backgroundColor = "#FFFFFF"; // Change to the desired hover color
    }
  };

  const handleHoverExit = (e) => {
    e.target.style.textDecoration = 'none';
    e.target.style.color = "white";

    if (e.target.classList.contains('login-box')) {
      e.target.style.backgroundColor = "#A38469"; // Change to the desired hover color
    }
  };

  const handleLogout = () => {
    // Clear username from localStorage
    localStorage.removeItem('username');
    // Clear user from context
    setUser(null);
    // Hide the dropdown
    setShowDropdown(false);
  };

  const handleUsernameClick = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown menu display
  };

  // Function to handle login
  const handleLogin = () => {
    // Set dummy username for demo
    const dummyUsername = 'username';
    localStorage.setItem('username', dummyUsername); // Set dummy username
    setUser(dummyUsername); // Set dummy user
  };

  return (
    <div>
      <header style={headerStyle}>
        <div style={overlayStyle}></div>
        <div className="left">
          <img
            src="./Images/Sai4.png"
            style={logoStyle}
            className="nav-image"
            alt="Logo"
          />
          <nav style={navContainerStyle}>
            <a href="/" style={navLinkStyle} onMouseEnter={handleHover} onMouseLeave={handleHoverExit}>
              Home
            </a>
            <a href="/about" style={navLinkStyle} onMouseEnter={handleHover} onMouseLeave={handleHoverExit}>
              About Us
            </a>
            <a href="/gallery" style={navLinkStyle} onMouseEnter={handleHover} onMouseLeave={handleHoverExit}>
              Galleries
            </a>
            <a href="/contact" style={navLinkStyle} onMouseEnter={handleHover} onMouseLeave={handleHoverExit}>
              Contact Us
            </a>
            <div>
              {!user ? (
                <Button variant="primary" className="m-2" href="/connect" onMouseEnter={handleHover} onMouseLeave={handleHoverExit} onClick={handleLogin} style={{ marginLeft: '50px', width: '100px', height: '40px' }}>
                  Login
                </Button>
              ) : (
                <div className="d-flex align-items-center">
                  <div style={{ position: 'relative' }}>
                    <span style={{ ...navLinkStyle, ...usernameStyle }} onClick={handleUsernameClick}>
                      {user}
                    </span>
                    {showDropdown && (
                      <div style={dropdownStyle}>
                        <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>User Profile</Link>
                        <Link to="/" className="dropdown-item" onClick={handleLogout}>Logout</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Home;
