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
    <div>
      <h1>Lista de Profesores</h1>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          marginBottom: "20px",
          fontSize: "16px",
          backgroundColor: "whitesmoke"
        }}
      />

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredProfessors.length > 0 ? (
            filteredProfessors.map((professor) => (
              <tr key={professor.id}>
                <td>{professor.user?.full_name}</td>
                <td>{professor.user?.email}</td>
                <td>{professor.specialty}</td>

                <td>
                  <button onClick={() => handleEdit(professor.id)}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(professor.id)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No se encontraron profesores con ese nombre.
              </td>
            </tr>
          )}
        </tbody>

      </table>

      <BackButton />
    </div>
  );
}

export default ProfessorList;
