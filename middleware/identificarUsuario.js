import Jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const identificarUsuario = async (req, res, next) => {

    // Identificar si hay un token
    const {_token} = req.cookies
    if (!_token) {
        console.log("No token found, setting req.usuario to null");
        req.usuario = null
        return next();
    }

    // Comprobar el token
    try {
        const decoded = Jwt.verify(_token, process.env.JWT_SECRET);
        console.log("Token decodificado:", decoded);

        const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id);
        console.log("Usuario encontrado:", usuario);

        // Almacenar el usuario en req
        if (usuario) {
            req.usuario = usuario;
            res.locals.usuario = usuario;
        } else {
            req.usuario = null;
        }

        return next();

    } catch (error) {
        console.log("Error al verificar token:", error);
        return res.clearCookie('_token').redirect('/auth/login');
    }
}

export default identificarUsuario;
