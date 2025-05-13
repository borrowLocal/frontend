import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import heroImg from '../assets/heroImg.png';
import '../styles/Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();
  
  return (
    <div className="main-container">
      <header className="header">
        <div className="logo"> BOROLO </div>
        <nav>
          <button className="nav-button" onClick={() => navigate('/login')}>
            ☰
          </button>
        </nav>
      </header>
      
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-text">
            <h2>안 쓰는 물건도 수익이 된다</h2>
            <p>바로로에서 공유하고 수익을 만들어보세요!</p>
          </div>
          <div className="hero-image">
            <img src={heroImg} alt="Hero" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
        </div>
      </footer>

      <Outlet />
    </div>
  );
};

export default Onboarding; 