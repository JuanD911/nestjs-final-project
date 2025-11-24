import './Card.css';

function Card({
  icon: Icono,
  title,
  description,
  onClick = () => {},
}) {
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <div 
      className="card-content" 
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      {Icono && (
        <div className="card-icon-container">
          <Icono className="card-icon" />
        </div>
      )}
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
}

export default Card;