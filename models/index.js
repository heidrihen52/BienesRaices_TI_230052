import Propiedad from './Propiedad.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'
import Mensaje from './Mensaje.js'

Propiedad.belongsTo(Precio, { foreignKey: 'precioID' })
Propiedad.belongsTo(Categoria, { foreignKey: 'categoriaID' })
Propiedad.hasMany(Mensaje, { foreignKey: 'propiedadID' })
Usuario.hasMany(Propiedad, { as: 'propiedades', foreignKey: 'usuarioID' });
Propiedad.belongsTo(Usuario, { foreignKey: 'usuarioID', as: 'usuario' });

Mensaje.belongsTo(Propiedad, { foreignKey: 'propiedadID' })
Mensaje.belongsTo(Usuario, { foreignKey: 'usuarioID' })


export {
    Propiedad,
    Precio,
    Categoria,
    Usuario,
    Mensaje
}