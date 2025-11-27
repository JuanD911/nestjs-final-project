import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfessorById, updateProfessor } from "../../services/professorService";
import Form from "../ui/form/Form";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";

function ProfessorEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    specialty: ""
  });

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfessor = async () => {
    try {
      const professor = await getProfessorById(id);

      const initialValues = {
        full_name: professor.user.full_name,
        email: professor.user.email,
        password: "",
        specialty: professor.specialty
      };

      setFormData(initialValues);
      setOriginalData(initialValues);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching professor:", error);
      alert("Hubo un error cargando el profesor");
      navigate("/professors/list");
    }
  };

  useEffect(() => {
    fetchProfessor();
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

    if (!originalData) return;

    const updateData = {};
    const userUpdate = {};

    if (formData.full_name !== originalData.full_name) {
      userUpdate.full_name = formData.full_name;
    }

    if (formData.email !== originalData.email) {
      userUpdate.email = formData.email;
    }

    if (formData.password.trim() !== "") {
      userUpdate.password = formData.password;
    }

    if (formData.specialty !== originalData.specialty) {
      updateData.specialty = formData.specialty;
    }

    if (Object.keys(userUpdate).length > 0) {
      updateData.user = userUpdate;
    }

    if (Object.keys(updateData).length === 0) {
      alert("No se realizaron cambios");
      return;
    }

    try {
      await updateProfessor(id, updateData);
      alert("Profesor actualizado correctamente");
      navigate("/professors/list");
    } catch (error) {
      console.error("Error updating professor:", error);
      alert("Hubo un error actualizando el profesor");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Form title="Editar Profesor" onSubmit={handleSubmit}>

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
        title="Especialidad"
        label="Especialidad"
        type="text"
        id="specialty"
        name="specialty"
        value={formData.specialty}
        onChange={handleChange}
        required
      />

      <Button>Guardar Cambios</Button>
    </Form>
  );
}

export default ProfessorEditForm;
