import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

export default function App() {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  return (
    <main className="container">
      {mostrarRegistro ? (
        <Register irALogin={() => setMostrarRegistro(false)} />
      ) : (
        <Login irARegistro={() => setMostrarRegistro(true)} />
      )}
    </main>
  );
}