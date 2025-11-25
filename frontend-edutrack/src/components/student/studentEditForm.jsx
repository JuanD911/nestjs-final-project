import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById, updateStudent } from "../../services/studentService";
import Form from "../ui/form/Form";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";

function StudentEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    entryYear: "",
    role: "Estudiante"
  });

  const [loading, setLoading] = useState(true);

  const fetchStudent = async () => {
    try {
      const student = await getStudentById(id);

      setFormData({
        full_name: student.user.full_name,
        email: student.user.email,
        password: "",
        entryYear: student.entryYear,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching student:", error);
      alert("Hubo un error cargando el estudiante");
      navigate("/students/list");
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      entryYear: Number(formData.entryYear),
      user: {
        full_name: formData.full_name,
        email: formData.email,
        ...(formData.password.trim() !== "" && { password: formData.password }),
        role: "Estudiante"
      }
    };

    try {
      await updateStudent(id, updateData);
      alert("Estudiante actualizado correctamente");
      navigate("/students/list");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Hubo un error actualizando el estudiante");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Form title="Editar Estudiante" onSubmit={handleSubmit}>

      <Input
        title="Nombre Completo"
        label="Nombre Completo"
        type="text"
        id="full_name"
        name="full_name"
        value={formData.full_name}
        onChange={handleChange}
        required
      />

      <Input
        title="Correo Electrónico"
        label="Correo Electrónico"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        title="Contraseña"
        label="Nueva Contraseña (opcional)"
        type="password"
        id="password"
        name="password"
        placeholder="Déjalo vacío para no cambiarla"
        value={formData.password}
        onChange={handleChange}
      />

      <Input
        title="Año de Ingreso"
        label="Año de Ingreso"
        type="number"
        id="entryYear"
        name="entryYear"
        value={formData.entryYear}
        onChange={handleChange}
        required
      />

      <Button>Guardar Cambios</Button>
    </Form>
  );
}

export default StudentEditForm;
