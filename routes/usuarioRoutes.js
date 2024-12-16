import express from "express";
import upload from '../middleware/upload.js';
import { 
    formularioLogin, 
    formularioRegistro, 
    registrar, 
    confirmar, 
    formularioOlvidePassword, 
    resetPassword, 
    comprobarToken, 
    nuevoPassword, 
    autenticar, 
    cerrarSesion,
    mostrarUsuario,
    subirFotoPerfil,
    almacenarFotoPerfil
} from "../controllers/usuarioController.js";

const router = express.Router();

// Routing para login
router.get('/login', formularioLogin);
router.post('/login', autenticar);

// Cerrar sesión
router.post('/cerrar-sesion', cerrarSesion);

// Registro de usuario
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

// Ruta para subir la foto de perfil
router.get('/registro/:id', subirFotoPerfil);
router.post('/registro/:id', upload.single('imagen'), almacenarFotoPerfil);

// Confirmar cuenta
router.get('/confirmar/:token', confirmar);

// Olvidar contraseña
router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

 // Ruta para mostrar el perfil del usuario 
router.get('/:id', mostrarUsuario);
export default router;
