import "./Select.css";

function Select({ label, id, name, value, onChange, options = [], required }) {
    return (
        <div className="select-wrapper">
            <label htmlFor={id} className="select-label">
                {label}
            </label>

            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="select-field"
            >
                <option value="">Selecciona una opción</option>

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
