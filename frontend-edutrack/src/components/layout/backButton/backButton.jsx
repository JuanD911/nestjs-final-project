import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../ui/button/Button';
import './backButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  if (location.pathname === '/') {
    return null;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="back-button-wrapper">
      <Button onClick={handleGoBack}>
        &larr; Volver
      </Button>
    </div>
  );
};

export default BackButton;