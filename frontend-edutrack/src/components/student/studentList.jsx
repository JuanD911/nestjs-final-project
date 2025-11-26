import { useEffect, useState } from "react";
import { getAllStudents, deleteStudent } from "../../services/studentService";
import { useNavigate } from "react-router-dom";
import BackButton from '../layout/backButton/backButton';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar este estudiante?");
    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      alert("Estudiante eliminado correctamente");
      fetchStudents();
    } catch (error) {
      alert("Error eliminando estudiante");
    }
  };

  const handleEdit = (id) => {
    navigate(`/students/edit/${id}`);
  };

  const filteredStudents = students.filter(student =>
    student.user?.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1>Lista de Estudiantes</h1>

      {/* Search input */}
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

      {filteredStudents.length === 0 ? (
        <p>No se encontraron estudiantes con ese nombre.</p>
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
              <th style={thStyle}>Año de Ingreso</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} style={trStyle}>
                <td style={tdStyle}>{student.user?.full_name}</td>
                <td style={tdStyle}>{student.user?.email}</td>
                <td style={tdStyle}>{student.entryYear}</td>

                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(student.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(student.id)}
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

export default StudentList;
