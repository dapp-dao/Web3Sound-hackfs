// Navbar.tsx
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav style={{ position: 'fixed', top: 0, display: 'flex', justifyContent: 'space-between', width: '100%', zIndex: 1 }}>
      <div>
        <button>Home</button>
        <button>Account</button>
        <button>About</button>
      </div>
      <div>
        <button>Connect/Login</button>
      </div>
    </nav>
  );
}

export default Navbar;
