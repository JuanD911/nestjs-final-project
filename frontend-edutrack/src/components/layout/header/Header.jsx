import { useNavigate } from 'react-router-dom';
import './Header.css';
import ToggleButton from '../../ui/toggleButton/ToggleButton';
import { useTheme } from '../../theme/ThemeProvider';
import Button from '../../ui/button/Button';       

const Header = () => {
  const { alterTheme } = useTheme(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log(`Log out`)
    navigate('/login'); 

  };

  return (
    <header className="app-header">
      
      <div className="logo-container">
        <span className="logo-icon">🎓</span> 
        <h1 className="app-title">EduTrack</h1>
      </div>
      
      <nav className="main-nav">
        <a href="/main" className="nav-link">Inicio</a>
        <a href="/students" className="nav-link">Estudiantes</a>
        <a href="/professors" className="nav-link">Profesores</a>
        <a href="/courses" className="nav-link">Cursos</a>
        <a href="/enrollments" className="nav-link">Inscripciones</a>
      </nav>
      
      <div className="action-container">
        
        <ToggleButton onToggle={alterTheme} /> 
        
        <Button onClick={handleLogout}> 
          Cerrar Sesión
        </Button>
        
      </div>
    </header>
  );
};

export default Header;