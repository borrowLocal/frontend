import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Home.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>BOROLO</div>
      <nav>
        <button
          className="nav-button"
          onClick={() => navigate('/myPage', { state: { background: location.state?.background || location } })}
        >
          ☰
        </button>
      </nav>
    </header>
  );
};

export default Header;
