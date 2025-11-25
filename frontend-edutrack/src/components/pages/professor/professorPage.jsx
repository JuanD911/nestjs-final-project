import Card from "../../ui/card/Card";
import { FaUserPlus, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../layout/backButton/backButton';

function ProfessorPage() {
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
          title="Añadir Nuevo profesor"
          description="Abre el formulario de registro de un nuevo profesor."
          onClick={() => navigate('/professors/new')} 
        />
        
        <Card
          icon={FaUsers}
          title="Ver Listado"
          description="Consulta, edita y elimina profesores existentes."
          onClick={() => navigate('/professors/list')}
        />
      </div>
      <BackButton/>
    </div>
  );
}

export default ProfessorPage;