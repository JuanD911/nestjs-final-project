import { useEffect, useState } from "react";
import { getAllProfessors, deleteProfessor } from "../../services/professorService";
import { useNavigate } from "react-router-dom";
import BackButton from '../layout/backButton/backButton';

function ProfessorList() {
  const [professors, setProfessors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchProfessors = async () => {
    try {
      const data = await getAllProfessors();
      setProfessors(data);
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar este profesor?");
    if (!confirmDelete) return;

    try {
      await deleteProfessor(id);
      alert("Profesor eliminado correctamente");
      fetchProfessors();
    } catch (error) {
      alert("Error eliminando profesor");
    }
  };

  const handleEdit = (id) => {
    navigate(`/professors/edit/${id}`);
  };

  const filteredProfessors = professors.filter(professor =>
    professor.user?.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1>Lista de Profesores</h1>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "2px solid #ccc",
          backgroundColor: "var(--color-card-bg)",
          color: "var(--color-text)"
        }}
      />

      {filteredProfessors.length === 0 ? (
        <p>No se encontraron profesores con ese nombre.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            backgroundColor: "var(--color-background)"
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "var(--color-card-bg)" }}>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Especialidad</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredProfessors.map((professor) => (
              <tr key={professor.id} style={trStyle}>
                <td style={tdStyle}>{professor.user?.full_name}</td>
                <td style={tdStyle}>{professor.user?.email}</td>
                <td style={tdStyle}>{professor.specialty}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(professor.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(professor.id)}
                    style={{ color: "red" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: "20px" }}>
        <BackButton />
      </div>
    </div>
  );
}

const thStyle = {
  padding: "10px",
  fontWeight: "bold",
  borderBottom: "2px solid #ccc",
  textAlign: "left",
  color: "var(--color-text)"
};

const trStyle = {
  borderBottom: "1px solid #ddd"
};

const tdStyle = {
  padding: "10px",
  verticalAlign: "top",
  color: "var(--color-text)"
};

export default ProfessorList;
