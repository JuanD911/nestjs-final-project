import { useEffect, useState } from "react";
import { getAllCourses, deleteCourse } from "../../services/courseService";
import Button from "../ui/button/Button";
import BackButton from "../layout/backButton/backButton";
import { useNavigate } from "react-router-dom";

function CourseList() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            const result = await getAllCourses();
            setCourses(result);
        } catch (error) {
            console.error("Error obteniendo cursos:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar este curso?")) return;

        try {
            await deleteCourse(id);
            fetchCourses();
        } catch (error) {
            console.error("Error eliminando curso:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/courses/edit/${id}`);
    };

    return (
        <div style={{ padding: "20px", width: "100%" }}>
            <h2>Lista de Cursos</h2>

            {courses.length === 0 ? (
                <p>No hay cursos registrados.</p>
            ) : (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px"
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#eee" }}>
                            <th style={thStyle}>Nombre</th>
                            <th style={thStyle}>Descripción</th>
                            <th style={thStyle}>Créditos</th>
                            <th style={thStyle}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} style={trStyle}>
                                <td style={tdStyle}>{course.name}</td>
                                <td style={tdStyle}>{course.description}</td>
                                <td style={tdStyle}>{course.credits}</td>

                                <td style={tdStyle}>
                                    <Button
                                        style={{ marginRight: "10px" }}
                                        onClick={() => handleEdit(course.id)}
                                    >
                                        Editar
                                    </Button>

                                    <Button onClick={() => handleDelete(course.id)}>
                                        Eliminar
                                    </Button>
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
    textAlign: "left"
};

const trStyle = {
    borderBottom: "1px solid #ddd"
};

const tdStyle = {
    padding: "10px",
    verticalAlign: "top"
};

export default CourseList;
