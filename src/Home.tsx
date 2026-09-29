import { signOut } from "aws-amplify/auth";

interface HomeProps {
  userId: string;
  alCerrarSesion: () => void;
}

export default function Home({ userId, alCerrarSesion }: HomeProps) {

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
      <h1>Hola, {userId}</h1>

      <button type="button" onClick={handleSignOut}>
        Cerrar sesión
      </button>
    </main>
  );
}