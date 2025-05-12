import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ItemList from '../components/ListComponents/ItemList';
import Header from '../components/Header';
import '../styles/Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isRegisteredItemPage = location.pathname.startsWith('/registeredItem');

  return (
    <div className="main-container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {!isRegisteredItemPage && (
        <div className="content-layout">
          <Sidebar />
          <ItemList />
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default Home;
