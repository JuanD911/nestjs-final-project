import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import Form from "../ui/form/Form";
import BackButton from "../layout/backButton/backButton";
import TextArea from "../ui/textArea/TextArea";
import Select from "../ui/select/Select";

import { getCourseById, updateCourse } from "../../services/courseService";
import { getAllProfessors } from "../../services/professorService";

const formPageLayoutStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    width: "100%",
};

function CourseEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        credits: "",
        professorId: ""
    });

    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const [profRes, courseRes] = await Promise.all([
                    getAllProfessors(),
                    getCourseById(id)
                ]);

                setProfessors(profRes);

                setFormData({
                    name: courseRes.name,
                    description: courseRes.description,
                    credits: courseRes.credits,
                    professorId: courseRes.professor?.id || ""
                });

            } catch (error) {
                console.error("Error cargando datos del curso:", error);
            }
        }

        loadData();
    }, [id]);

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
            professor: formData.professorId
        };

        try {
            await updateCourse(id, payload);
            alert("Curso actualizado con éxito");
            navigate("/courses");
        } catch (error) {
            alert("Error actualizando el curso");
            console.error(error);
        }
    };

    return (
        <div style={formPageLayoutStyle}>
            <Form title="Editar Curso" onSubmit={handleSubmit}>

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
                    placeholder="Descripción del curso"
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
                    min="1"
                    max="10"
                    placeholder="1 - 10"
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

                <Button>Guardar Cambios</Button>

            </Form>

            <BackButton />
        </div>
    );
}

export default CourseEditForm;
