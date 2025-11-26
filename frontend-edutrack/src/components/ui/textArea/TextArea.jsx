import './TextArea.css';

function TextArea({ 
  label, 
  name, 
  id, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  rows = 4,
}) {
  const fieldId = id || name;

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={fieldId} className="input-label">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="input-field"
      />
    </div>
  );
}

export default TextArea;
