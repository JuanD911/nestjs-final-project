import Card from "../../ui/card/Card";
import { FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  
  const goToStudentModule = () => {
    navigate('/students'); 
  };
  
  return (
    <div className="main-page-grid">
      <Card
        icon={FaGraduationCap}
        title="Módulo Estudiantes"
        description="Gestión completa de alumnos y registros."
        onClick={goToStudentModule}
      />
    </div>
  );
}

export default MainPage;