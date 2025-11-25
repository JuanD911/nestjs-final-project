import './Header.css';
import ToggleButton from '../../ui/toggleButton/ToggleButton';
import { useTheme } from '../../theme/ThemeProvider';

const Header = () => {
  const { alterTheme } = useTheme(); 

  return (
    <header className="app-header">
      <div className="logo-container">
        <span className="logo-icon">🎓</span> 
        <h1 className="app-title">EduTrack</h1>
      </div>
      
      <nav className="main-nav">
        <a href="../pages/mainPage" className="nav-link">Inicio</a>
        <a href="/students" className="nav-link">Estudiantes</a>
        <a href="/" className="nav-link">Profesores</a>
        <a href="/" className="nav-link">Cursos</a>
        <a href="/" className="nav-link">Inscripciones</a>
      </nav>
      
      <ToggleButton onToggle={alterTheme} /> 
      
    </header>
  );
};

export default Header;