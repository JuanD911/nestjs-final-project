import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">

        <div className="footer-left">
          <span className="footer-logo">🎓</span>
          <span className="footer-title">EduTrack</span>
        </div>

        <div className="footer-center">
          <a href="/students" className="footer-link">Estudiantes</a>
          <a href="/professors" className="footer-link">Profesores</a>
          <a href="/courses" className="footer-link">Cursos</a>
          <a href="/enrollments" className="footer-link">Inscripciones</a>
        </div>

        <div className="footer-right">
          <span className="footer-text">© {new Date().getFullYear()} EduTrack</span>
          <span className="footer-text">Todos los derechos reservados</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
