import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Home.css';

const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>BOROLO</div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="검색" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
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
