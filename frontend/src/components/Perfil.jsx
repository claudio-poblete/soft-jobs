import { useEffect, useState } from 'react';
import '../index.css';

function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/api/usuarios/perfil', {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setUsuario(data));
  }, []);

  return (
    <div className="form-container">
      {usuario ? (
        <div>
          <h2>Perfil de {usuario.email}</h2>
          <p>Rol: {usuario.rol}</p>
          <p>Lenguaje: {usuario.lenguaje}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Perfil;
