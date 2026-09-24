import { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

export default function App() {
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
          },
        },
      });

      setShowConfirmation(true);
      setMessage('Se envió un código a tu correo.');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo crear la cuenta.');
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
      <div className="register-card">
        <h1>Crear una cuenta</h1>
        <p>Continuar con correo</p>

        {!showConfirmation ? (
          <form onSubmit={handleRegister}>
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

            <button type="submit"> Crear cuenta </button>
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

            <button type="submit"> Confirmar cuenta </button>
          </form>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </main>
  );
}
