import { signOut } from "aws-amplify/auth";

interface HomeProps {
  alCerrarSesion: () => void;
}

export default function Home({ alCerrarSesion }: HomeProps) {

  async function handleSignOut() {
    try {
      await signOut();
      console.log("Sesión cerrada");
      alCerrarSesion();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h1>Hola, usuario</h1>

      <button type="button" onClick={handleSignOut}>
        Cerrar sesión
      </button>
    </main>
  );
}