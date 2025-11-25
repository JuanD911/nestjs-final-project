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
    <div>
      <h1>Lista de Estudiantes</h1>

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
            <th>Año de Ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.user?.full_name}</td>
                <td>{student.user?.email}</td>
                <td>{student.entryYear}</td>

                <td>
                  <button onClick={() => handleEdit(student.id)}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(student.id)}
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
                No se encontraron estudiantes con ese nombre.
              </td>
            </tr>
          )}
        </tbody>

      </table>

      <BackButton />
    </div>
  );
}

export default StudentList;
