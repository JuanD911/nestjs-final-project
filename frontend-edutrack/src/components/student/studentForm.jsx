import { useState } from "react";
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import Form from '../ui/form/Form';
import { createStudent } from "../../services/studentService";
import { UserTypes } from '../../types/userTypes';
import BackButton from "../layout/backButton/backButton";

const initial_data = {
    full_name: "",
    email: "",
    password: "",
    entryYear: ""
}

const formPageLayoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    gap: '15px', 
    width: '100%',
};

function StudentForm () {
    const [formData, setFormData] = useState(initial_data);

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
                role: UserTypes.student
            }
        };

        try {
            const result = await createStudent(payload);
            setFormData(initial_data);
            alert("Estudiante creado con éxito");
            console.log(result);
        } catch (error) {
            alert("Error creando estudiante");
        }
    };

    return(
        <>
        <div style={formPageLayoutStyle}> 
            <Form title='Registrar Estudiante' onSubmit={handleSubmit}>
                <Input 
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
            <BackButton/> 
        </div>
        </>
    )
}

export default StudentForm;