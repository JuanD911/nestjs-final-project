import { useState, useEffect } from "react";
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import Form from '../ui/form/Form';
import BackButton from "../layout/backButton/backButton";
import Select from "../ui/select/Select";
import { createEnrollment } from "../../services/enrollmentService";
import { getAllStudents } from "../../services/studentService";
import { getAllCourses } from "../../services/courseService";

const initial_data = {
    enrollmentDate: "",
    grade: "",
    studentId: "",
    courseId: ""
};

const formPageLayoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    width: '100%',
};

function EnrollmentForm() {
    const [formData, setFormData] = useState(initial_data);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const studentsRes = await getAllStudents();
                const coursesRes = await getAllCourses();
                setStudents(studentsRes);
                setCourses(coursesRes);
            } catch (error) {
                console.error("Error cargando estudiantes o cursos", error);
            }
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            enrollmentDate: formData.enrollmentDate || undefined,
            grade: formData.grade !== "" ? Number(formData.grade) : undefined,
            student: formData.studentId,
            course: formData.courseId,
        };

        console.log("Payload enviado:", payload);

        try {
            const result = await createEnrollment(payload);
            setFormData(initial_data);
            alert("Inscripción creada con éxito");
        } catch (error) {
            alert("Error creando inscripción");
            console.error(error);
        }
    };

    return (
        <div style={formPageLayoutStyle}>
            <Form title="Registrar Inscripción" onSubmit={handleSubmit}>

                <Input
                    label="Fecha de Inscripción"
                    type="date"
                    id="enrollmentDate"
                    name="enrollmentDate"
                    value={formData.enrollmentDate}
                    onChange={handleChange}
                />

                <Input
                    label="Nota"
                    type="number"
                    id="grade"
                    name="grade"
                    placeholder="0 - 5"
                    value={formData.grade}
                    onChange={handleChange}
                    min="0"
                    max="5"
                />

                <Select
                    label="Estudiante"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                    options={students.map((s) => ({
                        value: s.id,
                        label: s.user?.full_name || "Sin nombre"
                    }))}
                />

                <Select
                    label="Curso"
                    id="courseId"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    required
                    options={courses.map((c) => ({
                        value: c.id,
                        label: c.name
                    }))}
                />

                <Button>Registrar Inscripción</Button>
            </Form>

            <BackButton />
        </div>
    );
}

export default EnrollmentForm;
