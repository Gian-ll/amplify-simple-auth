import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Home from "./Home";
import { signIn, confirmSignUp, getCurrentUser } from "aws-amplify/auth";

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements;
}

interface LoginProps {
  irARegistro: () => void;
}

export default function Login({ irARegistro }: LoginProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [haIniciadoSesion, setHaIniciadoSesion] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
  async function comprobarSesion() {
    try {
      const { userId } = await getCurrentUser();
      setUserId(userId);
      setHaIniciadoSesion(true);
    } catch (error) {
      console.log("No hay una sesión activa");
    }
  }
  comprobarSesion();
  }, []);

  async function handleSubmit(event: FormEvent<SignInForm>) {
    event.preventDefault();

    const form = event.currentTarget;

    setEmail(form.elements.email.value);

    try {
      const { nextStep } = await signIn({
        username: form.elements.email.value,
        password: form.elements.password.value,
      });

      console.log("Siguiente paso:", nextStep);

      if (nextStep.signInStep === "DONE") {
        const { userId } = await getCurrentUser();
        console.log("¡Inicio de sesión exitoso!");
        setUserId(userId);
        setHaIniciadoSesion(true);
      }

      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        console.log("El usuario debe confirmar su cuenta");
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  async function handleConfirm(event: FormEvent) {
    event.preventDefault();

    try {
      await confirmSignUp({ username: email, confirmationCode: code });

      console.log("¡Cuenta confirmada correctamente!");

      setShowConfirmation(false);
    } catch (error) {
      console.error("Error al confirmar cuenta:", error);
    }
  }
  if (haIniciadoSesion) {
    return ( 
      <Home 
        userId={userId}
        alCerrarSesion={() => setHaIniciadoSesion(false)} 
      />)
    ;
  }
  return (
    <div className="register-card">
      {!showConfirmation ? (
        <>
          <h1>Iniciar Sesión</h1>
          <p>Continuar con correo</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="Correo"
              id="email"
              name="email"
              required
            />

            <label htmlFor="password">
              Contraseña
            </label>

            <input
              type="password"
              placeholder="Contraseña"
              id="password"
              name="password"
              required
            />

            <button type="submit">
              INICIAR SESIÓN
            </button>
            
            <button type="button"
            className="switch-button"
            onClick={irARegistro}
            > Crear cuenta </button>

          </form>
        </>
      ) : (
        <>
          <h1>Confirmar cuenta</h1>

          <p>
            Ingresa el código que recibiste en tu correo.
          </p>

          <form onSubmit={handleConfirm}>
            <label htmlFor="codigoConfirm">
              Código de confirmación
            </label>

            <input
              type="text"
              id="codigoConfirm"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <button type="submit">
              Confirmar cuenta
            </button>
          </form>
        </>
      )}
    </div>
  );
}