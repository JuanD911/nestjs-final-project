import Card from "../../ui/card/Card";
import { FaUserPlus, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../layout/backButton/backButton';

function StudentPage() {
  const navigate = useNavigate();

  const cardContainerStyle = {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '30px',
  };
  
  return (
    <div className="student-page-layout">
      <div style={cardContainerStyle}>

        <Card
          icon={FaUserPlus}
          title="Añadir Nuevo Estudiante"
          description="Abre el formulario de registro de un nuevo estudiante."
          onClick={() => navigate('/students/new')} 
        />
        
        <Card
          icon={FaUsers}
          title="Ver Listado"
          description="Consulta, edita y elimina estudiantes existentes."
          onClick={() => navigate('/students/list')}
        />
      </div>
      <BackButton/>
    </div>
  );
}

export default StudentPage;