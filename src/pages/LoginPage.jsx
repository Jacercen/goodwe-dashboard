import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/goodweApi";

function LoginPage() {
  const navigate = useNavigate();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await login(account, password);

      if (response.data.authenticated) {
        navigate("/plants");
      } else {
        setError("No se pudo iniciar sesión.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setError("Correo electrónico o contraseña incorrectos.");
      } else {
        setError("No se pudo conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <span className="login-eyebrow">Solar Monitor</span>
          <h1>Iniciar sesión</h1>
          <p>Accede para seleccionar una instalación.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="account">Correo electrónico</label>

            <input
              id="account"
              type="email"
              value={account}
              onChange={(event) => setAccount(event.target.value)}
              placeholder="correo@ejemplo.com"
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Contraseña</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Contraseña"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
