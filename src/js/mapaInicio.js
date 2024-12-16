(function () {
    const lat = 20.204233;
    const lng = -98.017315;
    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);

    let markers = new L.FeatureGroup().addTo(mapa);
    let propiedades = [];
    
    // Filtros
    const filtros = {
        categoria: '',
        precio: '',
        operacion: ''  // Nuevo filtro de operación
    };

    // Selección de elementos HTML
    const categoriasSelect = document.querySelector('#categorias');
    const preciosSelect = document.querySelector('#precios');
    const operacionSelect = document.querySelector('#operacion'); // Selector de operación

    // Cargar el mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Eventos de los selectores
    categoriasSelect.addEventListener('change', e => {
        filtros.categoria = +e.target.value;
        filtrarPropiedades();
    });

    preciosSelect.addEventListener('change', e => {
        filtros.precio = +e.target.value;
        filtrarPropiedades();
    });

    operacionSelect.addEventListener('change', e => {
        filtros.operacion = e.target.value; // Actualiza el filtro de operación
        filtrarPropiedades();
    });

    // Obtener las propiedades desde la API
    const obtenerPropiedades = async () => {
        try {
            const url = '/api/propiedades';  // Asegúrate de que esta URL devuelva los datos correctos
            const respuesta = await fetch(url);
            propiedades = await respuesta.json();

            mostrarPropiedades(propiedades);  // Muestra todas las propiedades inicialmente
        } catch (error) {
            console.error('Error al obtener propiedades:', error);
        }
    };

    // Mostrar propiedades en el mapa
    const mostrarPropiedades = propiedades => {
        // Limpiar markers previos
        markers.clearLayers();

        propiedades.forEach(propiedad => {
            const marker = new L.marker([propiedad.lat, propiedad.lng], {
                autoPan: true
            })
                .addTo(mapa)
                .bindPopup(`
                    <p class="text-celadon-200 font-bold">${propiedad.categoria.nombre}</p>
                    <h1 class="text-xl font-extrabold uppercase my-5">${propiedad.titulo}</h1>
                    <img src="/uploads/${propiedad.imagen}" alt="Imagen de la propiedad ${propiedad.titulo}">
                    <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
                    <a href="/propiedad/${propiedad.id}" class="bg-celadon-200 block p-2 text-center font-bold uppercase">Ver Propiedad</a>
                `);

            markers.addLayer(marker);
        });
    };

    // Filtrar propiedades según los criterios seleccionados
    const filtrarPropiedades = () => {
        const resultado = propiedades
            .filter(filtrarCategoria)
            .filter(filtrarPrecio)
            .filter(filtrarOperacion);  // Añadido el filtro de operación

        mostrarPropiedades(resultado);
    };

    // Funciones de filtrado individuales
    const filtrarCategoria = (propiedad) => {
        return filtros.categoria ? propiedad.categoriaID === filtros.categoria : true;
    };

    const filtrarPrecio = (propiedad) => {
        return filtros.precio ? propiedad.precioID === filtros.precio : true;
    };

    const filtrarOperacion = (propiedad) => {
        return filtros.operacion ? propiedad.operacion === filtros.operacion : true;
    };

    // Llama a la función para obtener propiedades al cargar la página
    obtenerPropiedades();
})();
