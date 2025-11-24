import './Form.css'

export default function Form({ children, onSubmit, title}) {
    return (
        <div className="form-container-card">
            <h2 className='form-title'>{title}</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                {children}
            </form>
        </div>
    );
}