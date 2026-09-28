import { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

export default function App() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [code, setCode] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState('');

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
      setMessage('Se envió un código a tu correo.');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo crear la cuenta D:');
    }
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      setMessage('¡Cuenta confirmada correctamente!');
    } catch (error) {
      console.error(error);
      setMessage('El código de confirmación no es correcto.');
    }
  }

  return (
    <main className="container">
      <div className="formulario-card">
        <h1>Crear una cuenta</h1>
        <button type="button" className="google-metodo">
          Continuar con Google
        </button>

        <div className="separador">
          <span></span>
        </div>

        <p>Continuar con Correo</p>

        {!showConfirmation ? (
          <form onSubmit={handleRegister}>

            <div className="nombre-apellido">
              <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              />

              <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              />
            </div>

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <button type="submit" className="boton"> CREAR CUENTA </button>
          </form>
        ) : (
          <form onSubmit={handleConfirm}>
            <label>Verificar Correo</label>

            <input
              type="text"
              placeholder="Ingresa el código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <button type="submit" className="boton"> CONFIRMAR </button>
          </form>
        )}

        {message && <p className="message">{message}</p>}
      </div>

      <div className='Terminos-Privacidad'>
        <a
        href="https://helvet.mx/legal/terminos"
        target="_blank"
        rel="noopener noreferrer"
        >
          Términos
        </a>
        <span> y </span>
        <a
        href="https://helvet.mx/legal/privacidad"
        target="_blank"
        rel="noopener noreferrer"
        >
          Avisos de privacidad
        </a>
      </div>
    </main>
  );
}
