import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ItemList from '../components/ListComponents/ItemList';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="main-container">
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
      
      <div className="content-layout">
        <Sidebar />
        <ItemList />
      </div>

      <Outlet />
    </div>
  );
};

export default Home; 