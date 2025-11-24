import { useTheme } from '../../theme/ThemeProvider';
import Button from '../button/Button';

const ToggleButton = ({ onToggle }) => {
  const { theme } = useTheme(); 

  return (
    <Button 
      className={`theme-toggle-button ${theme}`} 
      onClick={onToggle}
    >
      {theme === 'light' ? ' 🌙 ' : ' ☀️ '}
    </Button>
  );
};

export default ToggleButton;