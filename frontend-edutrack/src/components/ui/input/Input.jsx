import './Input.css';

function Input({
  label, 
  name, 
  id, 
  type, 
  value, 
  onChange, 
  placeholder, 
  required = false 
}) {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={id || name} className="input-label">{label}</label>}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-field"
      />
    </div>
  );
}

export default Input;
