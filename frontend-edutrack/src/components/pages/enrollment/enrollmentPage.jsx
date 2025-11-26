import Card from "../../ui/card/Card";
import { FaUserPlus, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../layout/backButton/backButton';

function EnrollmentPage() {
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
          title="Añadir Nueva Inscripción"
          description="Abre el formulario de registro de una nueva inscripción."
          onClick={() => navigate('/enrollments/new')} 
        />
        
        <Card
          icon={FaUsers}
          title="Ver Listado"
          description="Consulta, edita y elimina inscripciones existentes."
          onClick={() => navigate('/enrollments/list')}
        />
      </div>
      <BackButton/>
    </div>
  );
}

export default EnrollmentPage;