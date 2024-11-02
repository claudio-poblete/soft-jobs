import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [lenguaje, setLenguaje] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async () => {
    const response = await fetch('http://localhost:4000/api/usuarios/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rol, lenguaje }),
    });

    if (response.ok) {
      alert('Registro exitoso');
      navigate('/login');
    } else {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="container">
    <h1>Registrarse</h1>
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrarse</button>
    </form>
  </div>
  );
}

export default Registro;
