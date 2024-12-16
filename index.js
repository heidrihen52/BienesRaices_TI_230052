import express from 'express';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import usuariooRoutes from './routes/usuariooRoutes.js'
import db from './config/db.js';
import identificarUsuario from './middleware/identificarUsuario.js'
import session from 'express-session';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; // Asegúrate de importar bcrypt

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

// Habilitar cookie Parser
app.use(cookieParser());

// Habilitar csurf (protección contra CSRF)
app.use(csurf({ cookie: true }));

// Habilitar sesión
app.use(session({
    secret: process.env.JWT_SECRET, // Usar variable de entorno para mayor seguridad
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Configuración para cookies seguras en producción
}));

// Conexión a la base de datos
try {
    await db.authenticate();
    await db.sync(); // Asegúrate de que las tablas se sincronicen con la base de datos
    console.log('Conexión a la BD exitosa!');
} catch (error) {
    console.error('Error al conectar a la BD:', error);
}
app.use(identificarUsuario);
// Habilitar pug como motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// Carpeta pública (archivos estáticos como imágenes, CSS, JS)
app.use(express.static('public'));

// Rutas
app.use('/', appRoutes);
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);
app.use('/api', apiRoutes);
app.use('/usuario', usuariooRoutes); 


// Ruta para el login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Consulta para obtener el usuario por email
        const [result] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (result.length > 0) {
            const user = result[0];

            // Comparar la contraseña ingresada con la almacenada en la base de datos
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // Si las contraseñas coinciden, guarda el usuarioId en la sesión
                req.session.usuarioId = user.id;
                console.log('usuarioId guardado en la sesión:', req.session.usuarioId);
                res.redirect('/usuario');
            } else {
                // Si no coincide, muestra un error
                res.status(401).send('Credenciales incorrectas');
            }
        } else {
            // Si el usuario no existe
            res.status(401).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error('Error al intentar iniciar sesión:', err);
        res.status(500).send('Error en el servidor');
    }
});

// Arrancar el servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});


app.get('/usuario', async (req, res) => {
    const usuarioId = req.session.usuarioId;

    if (!usuarioId) {
        return res.status(400).send('Usuario no autenticado');
    }

    console.log('ID de usuario en sesión:', usuarioId);  // Depuración aquí

    try {
        const [result] = await db.query('SELECT * FROM usuarios WHERE id = ?', [usuarioId]);

        console.log('Resultado de la consulta:', result);  // Depuración aquí

        if (result.length > 0) {
            const usuario = result[0];
            res.render('perfil', { usuario });
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error('Error al obtener datos del usuario:', err);
        res.status(500).send('Error al obtener datos');
    }
});
