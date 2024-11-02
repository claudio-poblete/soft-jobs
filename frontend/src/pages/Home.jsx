import { Link } from 'react-router-dom';
import '../index.css';

function Home() {
  return (
    <div className="form-container">
      <h1>Bienvenido a Soft Jobs</h1>
      <Link to="/login">Iniciar Sesión</Link> | <Link to="/registro">Registrarse</Link>
    </div>
  );
}

export default Home;
