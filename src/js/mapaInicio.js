
(function () {
    const lat = 20.67444163271174;
    const lng = -103.38739216304566;
    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);

    let markers = new L.FeatureGroup().addTo(mapa)
    let propiedades = [];
    //Filtros

    const filtros = {
        categoria: '',
        precio: '',
        operacion:''
    }

    const categoriasSelect = document.querySelector('#categorias');
    const preciosSelect = document.querySelector('#precios');
    const operacionSelect = document.querySelector('#operacion')


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa)

    //Filtrado de categorias y precios

    categoriasSelect.addEventListener('change', e => {
        filtros.categoria = +e.target.value
        filtrarPropiedades();
    })

    preciosSelect.addEventListener('change', e => {
        filtros.precio = +e.target.value
        filtrarPropiedades();
    })

    operacionSelect.addEventListener('change', e => {
        filtros.operacion = e.target.value; // Actualiza el filtro de operación
        filtrarPropiedades();
    });


    const obtenerPropiedades = async () => {
        try {
            const url = '/api/propiedades'
            const respuesta = await fetch(url)
            propiedades = await respuesta.json()

            mostrarPropiedades(propiedades)

        } catch (error) {
            console.error('Error al obtener propiedades:', error);
        }
    }

    const mostrarPropiedades = propiedades => {

        //Limpiar markers previos

        markers.clearLayers()

        propiedades.forEach(propiedad => {
            //Agregar los pines

            const marker = new L.marker([propiedad.lat, propiedad.lng], {
                autoPan: true
            })
                .addTo(mapa)
                .bindPopup(`
            <p class="text-green font-bold">${propiedad.categoria.nombre}</p>
            <h1 class="text-xl font-extrabold uppercase my-5"> ${propiedad.titulo}</h1>
            <img src="/uploads/${propiedad.imagen}" alt="Imagen de la propiedad ${propiedad.titulo}">
            <p class="text-gray font-bold">${propiedad.precio.nombre}</p>
            <a href="/propiedad/${propiedad.id}" class="bg-green block p-2 text-center font-bold uppercase">Ver Propiedad</a>
            `)

            markers.addLayer(marker)
        })
    }

    const filtrarPropiedades = () => {
        const resultado = propiedades
            .filter(filtrarCategoria)
            .filter(filtrarPrecio)
            .filter(filtrarOperacion);  // Añadido el filtro de operación

        mostrarPropiedades(resultado);
    }

    const filtrarCategoria = (propiedad) => {
        return filtros.categoria ? propiedad.categoriaID === filtros.categoria : true
    }

    const filtrarPrecio = (propiedad) => {
        return filtros.precio ? propiedad.precioID === filtros.precio : true
    }
    const filtrarOperacion = (propiedad) => {
        return filtros.operacion ? propiedad.operacion === filtros.operacion : true;
    };
    obtenerPropiedades()

})()