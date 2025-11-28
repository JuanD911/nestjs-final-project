# Sistema Académico – Fullstack App  
### **NestJS + TypeORM + PostgreSQL + React + Vite**

Un sistema académico completo que permite gestionar **estudiantes, profesores, cursos y matrículas**, con autenticación, validaciones y relaciones complejas de base de datos.

---

## Estructura del Proyecto

```
/project-root
│
├── backend/        # API REST – NestJS
│
└── frontend/       # Aplicación Web – React + Vite
```

---

## Tecnologías Principales

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Bcrypt
- Class Validator

### Frontend
- React + Vite  
- React Router DOM  
- Context API  
- UI Reusable Components  

---

### Clonar el repositorio

```
git clone git@github.com:JuanD911/nestjs-final-project.git
cd nestjs-final-project
```

# 1. Backend — NestJS

## Entrar al backend

```bash
cd backend-edutrack/
```

## Instalar dependencias

```bash
npm install
```

## Configurar Variables de Entorno

Crear archivo:

```
backend/.env
```

Contenido recomendado:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=nombre_db

JWT_SECRET=super_secret_key

## Ejecutar el backend

```bash
npm run start:dev
```

API disponible en:

http://localhost:3000  

---

# 2. Frontend — React + Vite

## Entrar al frontend

```bash
cd frontend-edutrack/
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar

```bash
npm run dev
```

App disponible en:

 http://localhost:5173

---

## Usuario Admin para probar aplicación

Debido a que se uso autenticacion con JWT, se creó un usuario admin, que puede utilizar todas las funcionalidades
de la aplicación. Es con este usuario que se ingresa desde el login cuando se ejecuta tanto el backend como el frontend

```
Correo Electrónico: admin.juan@edutrack.com
Contraseña: admin12345
```

# Comunicación Frontend ↔ Backend

Todas las peticiones usan:

```js
fetch(`http://localhost:3000/ruta`)
```

---

# Funcionalidades Principales

### Estudiantes
- CRUD
- Relación con User
- Relación con Enrollment

### Profesores
- CRUD  
- Relación con User  
- Relación con Course  

### Cursos
- CRUD  
- Relación con Profesor  
- Relación con Enrollment  

### Matrículas
- CRUD  
- Manejo de notas y fechas  

### Autenticación
- Login
- Hash de contraseñas
- Roles

---

---

**Juan David Duarte**  
Proyecto Final – Desarrollo Fullstack (NestJS + React)