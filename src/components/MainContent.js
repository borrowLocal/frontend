import React from 'react';
import '../styles/MainContent.css';

const MainContent = () => {
  return (
    <main className="main-content">
      <div className="items-grid">
        {[...Array(15)].map((_, index) => (
          <div key={index} className="item-card">
            <div className="item-image"></div>
            <h4 className="item-title">Title</h4>
            <p className="item-update">Updated today</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent; 