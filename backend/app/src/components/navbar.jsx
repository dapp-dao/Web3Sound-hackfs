import React from "react";
import { Link } from "react-router-dom";

const navStyle = {
  backgroundColor: '#333', // dark grey
  height: '50px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  color: 'white',
  padding: '10px',
  position: 'fixed', // This will fix the navbar to the top of the page
  top: '0', 
  left: '0', 
  width: '100%', 
  zIndex: '1', // This will keep the navbar above all other elements on the page
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  backgroundColor: '#4CAF50', // green
  border: 'none',
  padding: '15px 32px',
  textAlign: 'center',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  transitionDuration: '0.4s',
  cursor: 'pointer',
  borderRadius: '12px',
};

function NavBar() {
  return (
    <nav style={navStyle}>
      <ul>
        <li style={{ listStyleType: 'none' }}>
          <Link to="/walletConnect.js">Wallet Connect Page</Link>
        </li>
        <li style={{ listStyleType: 'none' }}>
          <Link to="/audio-player">Audio Player</Link>
        </li>
        <li>
          <Link to="/CreateProfile">CreateProfile</Link>
        </li>
        <li>
          <Link to="/audio-player">Dashboard</Link>
        </li>
        <li>
          <Link to="/">Profile</Link>
        </li>
        <li>
          <Link to="/audio-player">Search Creators</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default NavBar;
