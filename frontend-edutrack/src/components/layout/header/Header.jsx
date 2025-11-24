import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        {/* Usarías tu logo o un ícono aquí */}
        <span className="logo-icon">🎓</span> 
        <h1 className="app-title">EduTrack</h1>
      </div>
      
      <nav className="main-nav">
        <a href="../pages/mainPage" className="nav-link">Inicio</a>
        <a href="/" className="nav-link">Estudiantes</a>
        <a href="/" className="nav-link">Profesores</a>
      </nav>
    </header>
  );
};

export default Header;