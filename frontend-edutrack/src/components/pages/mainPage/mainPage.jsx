import Card from "../../ui/card/Card";
import { FaGraduationCap, FaChalkboardTeacher, FaFileSignature, FaBookOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  
  const goToStudentModule = () => {
    navigate('/students'); 
  };

  const goToProfessorModule = () => {
    navigate('/professors');
  };

  const goToEnrollmentModule = () => {
    navigate('/enrollments');
  };

  const goToCourseModule = () => {
    navigate('/courses');
  };

  const cardContainerStyle = {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '30px',
  };
  
  return (
    <div style={cardContainerStyle}>
      <Card
        icon={FaGraduationCap}
        title="Módulo Estudiantes"
        description="Gestión completa de alumnos y registros."
        onClick={goToStudentModule}
      />
      <Card
        icon={FaChalkboardTeacher}
        title="Módulo Profesores"
        description="Gestión completa de profesores y registros."
        onClick={goToProfessorModule}
      />

      <Card
        icon={FaFileSignature}
        title="Módulo Incripciones"
        description="Gestión completa de incripciones."
        onClick={goToEnrollmentModule}
      />

      <Card
        icon={FaBookOpen}
        title="Módulo Cursos"
        description="Gestión de completa de cursos ."
        onClick={goToCourseModule}
      />

    </div>
  );
}

export default MainPage;