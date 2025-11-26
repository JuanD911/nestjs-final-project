import Card from "../../ui/card/Card";
import { FaUserPlus, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../layout/backButton/backButton';

function CoursePage() {
  const navigate = useNavigate();

  const cardContainerStyle = {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '30px',
  };
  
  return (
    <div>
      <div style={cardContainerStyle}>

        <Card
          icon={FaUserPlus}
          title="Añadir Nuevo Curso"
          description="Abre el formulario de registro de un nuevo curso."
          onClick={() => navigate('/courses/new')} 
        />
        
        <Card
          icon={FaUsers}
          title="Ver Listado de cursos"
          description="Consulta, edita y elimina cursos vigentes."
          onClick={() => navigate('/courses/list')}
        />
      </div>
      <BackButton/>
    </div>
  );
}

export default CoursePage;