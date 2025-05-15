import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isItemDetail = location.pathname.startsWith('/item/');

  return (
    <div className="main-container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {(isHomePage||isItemDetail) ? (
        <div className="content-layout">
          <Sidebar />
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Home;
