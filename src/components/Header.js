import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">BOROLO</div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="검색" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <nav>
        <button className="nav-button" onClick={() => navigate('/myPage')}>
          ☰
        </button>
      </nav>
    </header>
  );
};

export default Header;
