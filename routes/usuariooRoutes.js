import express from "express";
import { mostrarUsuario, subirFotoPerfil, almacenarFotoPerfil,mostrarFormularioEditar,actualizarPerfil } from "../controllers/usuarioController.js";
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/:id', mostrarUsuario); // Mostrar el perfil del usuario
router.get('/:id/subir-foto', subirFotoPerfil); // Subir foto de perfil
router.post('/:id/subir-foto', upload.single('imagen'), almacenarFotoPerfil); // Guardar foto de perfil
// En tu archivo de rutas de usuario (usuarioRoutes.js o similar)
router.get('/:id/editar', mostrarFormularioEditar);
// En el archivo de rutas de usuario (usuarioRoutes.js o similar)
router.post('/:id/editar', upload.single('foto'), actualizarPerfil);

export default router;