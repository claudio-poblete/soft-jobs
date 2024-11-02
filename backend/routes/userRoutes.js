const express = require('express');
const { registrarUsuario, loginUsuario, obtenerPerfil } = require('../controllers/userController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', verificarToken, obtenerPerfil);

module.exports = router;
