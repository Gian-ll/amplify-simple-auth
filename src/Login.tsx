import { useState } from "react";
import type { FormEvent } from "react";

import { signIn, confirmSignUp } from "aws-amplify/auth";

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements;
}

export default function Login() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

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
        console.log("¡Inicio de sesión exitoso!");
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