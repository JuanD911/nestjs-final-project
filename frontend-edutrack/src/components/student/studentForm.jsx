import { useState } from "react";
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import Form from '../ui/form/Form';
import { createStudent } from "../../services/studentService";
import { UserTypes } from '../../types/userTypes';

function StudentForm () {

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        entryYear: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            entryYear: Number(formData.entryYear),
            user: {
                full_name: formData.full_name,
                email: formData.email,
                password: formData.password,
                role: UserTypes.student   // <--- importante
            }
        };

        try {
            const result = await createStudent(payload);
            alert("Estudiante creado con éxito");
            console.log(result);
        } catch (error) {
            alert("Error creando estudiante");
        }
    };

    return(
        <Form title='Registrar Estudiante' onSubmit={handleSubmit}>
            <Input 
                title='Nombre'
                label='Nombre Completo'
                type='text'
                id='full_name'
                name='full_name'
                placeholder='Escribe el nombre completo'
                value={formData.full_name}
                onChange={handleChange}
                required
            />

            <Input 
                title='Correo Electrónico'
                label='Correo Electrónico'
                type='text'
                id='email'
                name='email'
                placeholder='correo@ejemplos.com'
                value={formData.email}
                onChange={handleChange}
                required
            />

            <Input 
                title='Contraseña'
                label='Contraseña'
                type='password'
                id='password'
                name='password'
                placeholder=''
                value={formData.password}
                onChange={handleChange}
                required
            />

            <Input 
                title='Año de Ingreso'
                label='Año de Ingreso'
                type='number'
                id='entryYear'
                name='entryYear'
                placeholder='Año de Ingreso'
                value={formData.entryYear}
                onChange={handleChange}
                required
            />

            <Button>Registrar Estudiante</Button>
        </Form>
    )
}

export default StudentForm;
