import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../ui/form/Form";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Credenciales incorrectas");
        return;
      }

      localStorage.setItem("token", data.access_token);

      navigate('/main');
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <>
    <div className="login-container" style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
      <Form title="Iniciar Sesión" onSubmit={handleLogin}>
        
        <Input
          label="Correo electrónico"
          type="email"
          name="email"
          placeholder="admin@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Contraseña"
          type="password"
          name="password"
          placeholder="Tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <Button>Ingresar</Button>
      </Form>
    </div>
    </>
  );
}
