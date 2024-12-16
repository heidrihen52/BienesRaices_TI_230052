/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\r\n    const lat = 20.54082416030251;\r\n    const lng = -97.43207931518556;\r\n    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);\r\n\r\n    let markers = new L.FeatureGroup().addTo(mapa);\r\n    let propiedades = [];\r\n    \r\n    // Filtros\r\n    const filtros = {\r\n        categoria: '',\r\n        precio: '',\r\n        operacion: ''  // Nuevo filtro de operación\r\n    };\r\n\r\n    // Selección de elementos HTML\r\n    const categoriasSelect = document.querySelector('#categorias');\r\n    const preciosSelect = document.querySelector('#precios');\r\n    const operacionSelect = document.querySelector('#operacion'); // Selector de operación\r\n\r\n    // Cargar el mapa base\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    // Eventos de los selectores\r\n    categoriasSelect.addEventListener('change', e => {\r\n        filtros.categoria = +e.target.value;\r\n        filtrarPropiedades();\r\n    });\r\n\r\n    preciosSelect.addEventListener('change', e => {\r\n        filtros.precio = +e.target.value;\r\n        filtrarPropiedades();\r\n    });\r\n\r\n    operacionSelect.addEventListener('change', e => {\r\n        filtros.operacion = e.target.value; // Actualiza el filtro de operación\r\n        filtrarPropiedades();\r\n    });\r\n\r\n    // Obtener las propiedades desde la API\r\n    const obtenerPropiedades = async () => {\r\n        try {\r\n            const url = '/api/propiedades';  // Asegúrate de que esta URL devuelva los datos correctos\r\n            const respuesta = await fetch(url);\r\n            propiedades = await respuesta.json();\r\n\r\n            mostrarPropiedades(propiedades);  // Muestra todas las propiedades inicialmente\r\n        } catch (error) {\r\n            console.error('Error al obtener propiedades:', error);\r\n        }\r\n    };\r\n\r\n    // Mostrar propiedades en el mapa\r\n    const mostrarPropiedades = propiedades => {\r\n        // Limpiar markers previos\r\n        markers.clearLayers();\r\n\r\n        propiedades.forEach(propiedad => {\r\n            const marker = new L.marker([propiedad.lat, propiedad.lng], {\r\n                autoPan: true\r\n            })\r\n                .addTo(mapa)\r\n                .bindPopup(`\r\n                    <p class=\"text-celadon-200 font-bold\">${propiedad.categoria.nombre}</p>\r\n                    <h1 class=\"text-xl font-extrabold uppercase my-5\">${propiedad.titulo}</h1>\r\n                    <img src=\"/uploads/${propiedad.imagen}\" alt=\"Imagen de la propiedad ${propiedad.titulo}\">\r\n                    <p class=\"text-gray-600 font-bold\">${propiedad.precio.nombre}</p>\r\n                    <a href=\"/propiedad/${propiedad.id}\" class=\"bg-celadon-200 block p-2 text-center font-bold uppercase\">Ver Propiedad</a>\r\n                `);\r\n\r\n            markers.addLayer(marker);\r\n        });\r\n    };\r\n\r\n    // Filtrar propiedades según los criterios seleccionados\r\n    const filtrarPropiedades = () => {\r\n        const resultado = propiedades\r\n            .filter(filtrarCategoria)\r\n            .filter(filtrarPrecio)\r\n            .filter(filtrarOperacion);  // Añadido el filtro de operación\r\n\r\n        mostrarPropiedades(resultado);\r\n    };\r\n\r\n    // Funciones de filtrado individuales\r\n    const filtrarCategoria = (propiedad) => {\r\n        return filtros.categoria ? propiedad.categoriaID === filtros.categoria : true;\r\n    };\r\n\r\n    const filtrarPrecio = (propiedad) => {\r\n        return filtros.precio ? propiedad.precioID === filtros.precio : true;\r\n    };\r\n\r\n    const filtrarOperacion = (propiedad) => {\r\n        return filtros.operacion ? propiedad.operacion === filtros.operacion : true;\r\n    };\r\n\r\n    // Llama a la función para obtener propiedades al cargar la página\r\n    obtenerPropiedades();\r\n})();\r\n\n\n//# sourceURL=webpack://bienesraices220262/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;