import { signOut } from "aws-amplify/auth";

export default function Home() {

  async function handleSignOut() {
    try {
      await signOut();
      console.log("Sesión cerrada");
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