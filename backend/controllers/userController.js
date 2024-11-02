const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

exports.registrarUsuario = async (req, res) => {
  const { email, password, rol, lenguaje } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (email, password, rol, lenguaje) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, rol, lenguaje]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar el usuario.' });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado.' });

    const usuario = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Contraseña incorrecta.' });

    const token = jwt.sign({ email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

exports.obtenerPerfil = async (req, res) => {
  const { email } = req.usuario;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil.' });
  }
};
