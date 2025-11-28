# Proyecto EduTrack – Frontend React

Frontend desarrollado en **React + Vite** para la plataforma académica **EduTrack**, que permite gestionar:

- Usuarios  
- Estudiantes  
- Profesores  
- Cursos  
- Inscripciones  

Este frontend consume el backend implementado en **NestJS**.

---

## Tecnologías utilizadas

- **React** (Librería principal)
- **Vite** (Empaquetador rápido)
- **React Router DOM** (Rutas y navegación)
- **Context API** (Gestión de estado global)
- **Fetch API / Axios** (Consumo del backend)
- **CSS Modules / CSS Global** (Estilos)
- **ESLint** (Buenas prácticas)

---

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js (>= 18)
- npm (>= 9)
- Un navegador moderno
- Backend NestJS ejecutándose en local o remoto

---

## Instalación del proyecto

### Clonar el repositorio

```bash
git clone <URL-DEL-REPOSITORIO>
cd frontend-edutrack/
```

### Instalar dependencias

```bash
npm install
```

---


## Estructura del proyecto

```
src/
│── components/      # Componentes reutilizables
│── pages/           # Páginas principales
│── services/        # Conexión con la API
│── App.jsx          # Enrutamiento principal
│── main.jsx         # Punto de entrada
```

---

## Scripts disponibles

### Modo desarrollo
```
npm run dev
```
App disponible en:
```
http://localhost:5173
```

## Conexión con el backend

Ejemplo:

```js
const response = await fetch(`http://localhost:3000/students`);
```

---

## Funcionalidades implementadas

### ✔ Gestión de estudiantes  
### ✔ Gestión de profesores  
### ✔ Gestión de cursos  
### ✔ Gestión de inscripciones  
### ✔ Login y autenticación  
### ✔ Interfaz responsiva  

---

## Notas importantes

- El backend debe estar corriendo.

---

# Autor

**Juan David Duarte**  
Proyecto Final – Desarrollo Frontend con React
