# 📘 Proyecto EduTrack – Backend NestJS

Backend desarrollado en **NestJS + TypeORM + PostgreSQL** para la gestión de:

- Usuarios  
- Estudiantes  
- Profesores  
- Cursos  
- Inscripciones  

Proyecto presentado como entrega del curso **Desarrollo Backend con NestJS**.

---

## 🚀 Tecnologías utilizadas

- **NestJS** (Framework Backend)
- **TypeORM** (ORM)
- **PostgreSQL** (Base de datos)
- **Class-validator / class-transformer** (DTOs)
- **bcrypt** (Encriptación de contraseñas)
- **UUID v4** (Identificadores únicos)

---

## 📦 Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js (>= 18)
- npm (>= 9)
- PostgreSQL (>= 13)
- Nest CLI:

```
npm i -g @nestjs/cli
```

---

## 📁 Instalación del proyecto

### 1️⃣ Clonar el repositorio

```
git clone <URL-DEL-REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

### 2️⃣ Instalar dependencias

```
npm install
```

### 3️⃣ Crear archivo `.env`

Crea un archivo `.env` en la raíz del proyecto:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_bd

PORT=3000
```

---

## 🗄️ Configuración de TypeORM

Configuración en `app.module.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,   // ⚠️ Solo para desarrollo
})
```

---

## 🏃 Ejecutar el proyecto

### Modo desarrollo:
```
npm run start:dev
```

### Modo producción:
```
npm run start
```

El servidor quedará disponible en:

```
http://localhost:3000
```

---

# 📌 Endpoints principales

---

# 👤 Usuarios

### ➤ Crear usuario
```
POST /user/createUser
```

```json
{
  "full_name": "Carlos Ramírez",
  "email": "carlos.ramirez@edutrack.com",
  "password": "12345678",
  "role": "Estudiante"
}
```

### ➤ Obtener todos los usuarios
```
GET /user
```

### ➤ Obtener usuario por ID
```
GET /user/:id
```

### ➤ Actualizar usuario
```
PATCH /user/:id
```

### ➤ Eliminar usuario
```
DELETE /user/:id
```

---

# 🎓 Estudiantes

### ➤ Crear estudiante  
> Requiere un usuario previamente creado.

```
POST /student/createStudent
```

```json
{
  "nombreCompleto": "Carlos Ramírez",
  "entryYear": 2022,
  "userId": "UUID_DEL_USUARIO"
}
```

### ➤ Obtener todos los estudiantes
```
GET /student
```

### ➤ Obtener estudiante por ID
```
GET /student/:id
```

### ➤ Actualizar estudiante
```
PATCH /student/:id
```

### ➤ Eliminar estudiante
```
DELETE /student/:id
```

---

# 📝 Notas importantes

- Las contraseñas deben almacenarse encriptadas con **bcrypt**.
- El proyecto utiliza **UUID v4** como identificadores para usuarios y estudiantes.
- `synchronize: true` debe usarse solo en desarrollo.
- Las relaciones entre entidades están gestionadas con TypeORM.

---

# 👨‍💻 Autor

**Juan Duarte**  
Proyecto Final – Desarrollo Backend con NestJS