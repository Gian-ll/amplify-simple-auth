import type { FormEvent } from "react";
import { signIn } from "aws-amplify/auth";

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements;
}

export default function App() {

  async function handleSubmit(event: FormEvent<SignInForm>) {
    event.preventDefault();

    const form = event.currentTarget;

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
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  return (
    <main>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>

        <label htmlFor="email">
          Correo electrónico
        </label>

        <input
          type="email"
          id="email"
          name="email"
          required
        />

        <label htmlFor="password">
          Contraseña
        </label>

        <input
          type="password"
          id="password"
          name="password"
          required
        />

        <button type="submit">
          Iniciar sesión
        </button>

      </form>
    </main>
  );
}