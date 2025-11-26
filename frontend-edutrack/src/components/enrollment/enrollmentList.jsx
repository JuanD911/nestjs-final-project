import { useEffect, useState } from "react";
import { getAllEnrollments, deleteEnrollment, updateEnrollment } from "../../services/enrollmentService";
import Button from "../ui/button/Button";
import BackButton from "../layout/backButton/backButton";

function EnrollmentList() {
    const [enrollments, setEnrollments] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newGrade, setNewGrade] = useState("");

    const fetchEnrollments = async () => {
        try {
            const result = await getAllEnrollments();
            setEnrollments(result);
        } catch (error) {
            console.error("Error al obtener inscripciones:", error);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar esta inscripción?")) return;

        try {
            await deleteEnrollment(id);
            fetchEnrollments();
        } catch (error) {
            console.error("Error eliminando inscripción:", error);
        }
    };

    const handleStartEdit = (id, currentGrade) => {
        setEditingId(id);
        setNewGrade(currentGrade ?? "");
    };

    const handleSave = async (id) => {
        try {
            await updateEnrollment(id, { grade: Number(newGrade) });
            alert("Nota actualizada");
            setEditingId(null);
            fetchEnrollments();
        } catch (error) {
            alert("Error actualizando la nota");
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px", width: "100%" }}>
            <h2>Lista de Inscripciones</h2>

            {enrollments.length === 0 ? (
                <p>No hay inscripciones registradas.</p>
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
                            <th style={thStyle}>Estudiante</th>
                            <th style={thStyle}>Curso</th>
                            <th style={thStyle}>Fecha</th>
                            <th style={thStyle}>Nota</th>
                            <th style={thStyle}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {enrollments.map((enrollment) => (
                            <tr key={enrollment.id} style={trStyle}>
                                <td style={tdStyle}>
                                    {enrollment.student?.user?.full_name || "Sin data"}
                                </td>

                                <td style={tdStyle}>
                                    {enrollment.course?.name || "Sin data"}
                                </td>

                                <td style={tdStyle}>{enrollment.enrollmentDate}</td>

                                <td style={tdStyle}>
                                    {editingId === enrollment.id ? (
                                        <input
                                            type="number"
                                            min="0"
                                            max="5"
                                            value={newGrade}
                                            onChange={(e) => setNewGrade(e.target.value)}
                                            style={{
                                                padding: "5px",
                                                width: "60px",
                                                borderRadius: "6px",
                                                border: "1px solid #bbb"
                                            }}
                                        />
                                    ) : (
                                        enrollment.grade ?? "—"
                                    )}
                                </td>

                                <td style={tdStyle}>
                                    {editingId === enrollment.id ? (
                                        <>
                                            <Button
                                                style={{ marginRight: "10px" }}
                                                onClick={() => handleSave(enrollment.id)}
                                            >
                                                Guardar
                                            </Button>

                                            <Button
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancelar
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                style={{ marginRight: "10px" }}
                                                onClick={() =>
                                                    handleStartEdit(enrollment.id, enrollment.grade)
                                                }
                                            >
                                                Editar Nota
                                            </Button>

                                            <Button onClick={() => handleDelete(enrollment.id)}>
                                                Eliminar
                                            </Button>
                                        </>
                                    )}
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

export default EnrollmentList;
