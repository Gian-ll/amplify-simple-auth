import { useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";
interface RegisterProps {
  irALogin: () => void;
}
export default function Register({ irALogin }: RegisterProps)  {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email: email,
            given_name: nombre,
            family_name: apellido,
          },
        },
      });

      setShowConfirmation(true);
      setMessage("Se envió un código a tu correo.");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo crear la cuenta D:");
    }
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      setMessage("¡Cuenta confirmada correctamente!");
    } catch (error) {
      console.error(error);
      setMessage("El código de confirmación no es correcto.");
    }
  }

  return (
    <div className="formulario-card">
      <h1>Crear una cuenta</h1>
      <p>Continuar con correo</p>

      {!showConfirmation ? (
        <form onSubmit={handleRegister}>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Apellido</label>
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="boton"> Crear cuenta </button>

          <button type="button" 
          className="switch-button" onClick={irALogin}
          > Iniciar sesión </button>
          
        </form>
      ) : (
        <form onSubmit={handleConfirm}>
          <label>Código de confirmación</label>

          <input
            type="text"
            placeholder="Ingresa el código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <button type="submit" className="boton"> Confirmar cuenta </button>
        </form>
      )}

      {message && (<p className="message">{message}</p>
)}

    </div>
  );
}