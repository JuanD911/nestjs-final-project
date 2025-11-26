import { useState, useEffect } from "react";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import Form from "../ui/form/Form";
import BackButton from "../layout/backButton/backButton";
import TextArea from "../ui/textArea/TextArea";
import Select from "../ui/select/Select";
import { createCourse } from "../../services/courseService";
import { getAllProfessors } from "../../services/professorService";

const initial_data = {
    name: "",
    description: "",
    credits: "",
    professorId: ""
};

const formPageLayoutStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    width: "100%",
};

function CourseForm() {
    const [formData, setFormData] = useState(initial_data);
    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        async function fetchProfessors() {
            try {
                const data = await getAllProfessors();
                setProfessors(data);
            } catch (error) {
                console.error("Error cargando profesores:", error);
            }
        }
        fetchProfessors();
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
            name: formData.name,
            description: formData.description,
            credits: Number(formData.credits),
            professor: formData.professorId // UUID del profesor
        };

        try {
            await createCourse(payload);
            alert("Curso creado con éxito");
            setFormData(initial_data);
        } catch (error) {
            alert("Error creando curso");
            console.error(error);
        }
    };

    return (
        <div style={formPageLayoutStyle}>
            <Form title="Registrar Curso" onSubmit={handleSubmit}>

                <Input
                    label="Nombre del Curso"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ej: Matemáticas Avanzadas"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <TextArea
                    label="Descripción"
                    id="description"
                    name="description"
                    placeholder="Describe el contenido del curso"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                />

                <Input
                    label="Créditos"
                    type="number"
                    id="credits"
                    name="credits"
                    placeholder="1 - 5"
                    min="1"
                    max="10"
                    value={formData.credits}
                    onChange={handleChange}
                    required
                />

                <Select
                    label="Profesor"
                    id="professorId"
                    name="professorId"
                    value={formData.professorId}
                    onChange={handleChange}
                    required
                    options={professors.map((p) => ({
                        value: p.id,
                        label: p.user?.full_name || "Profesor sin nombre"
                    }))}
                />

                <Button>Registrar Curso</Button>
            </Form>

            <BackButton />
        </div>
    );
}

export default CourseForm;
