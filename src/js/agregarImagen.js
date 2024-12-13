import { Dropzone } from 'dropzone'
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
Dropzone.options.imagen = {
    dictDefaultMessage: 'Sube tus imagenes aquí',
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'El Limite es un Archivo',
    headers: {
        'CSRF-Token': token
    },
    paramName: 'imagen',
    init: function () {
        const dropzone = this
        const btnPublicar = document.querySelector('#publicar')

        btnPublicar.addEventListener('click', function () {
            dropzone.processQueue()
        })

        dropzone.on('queuecomplete', function() {
            if (dropzone.getActiveFiles().length === 0) {
                const context = dropzone.element.getAttribute('data-context');
        
                if (context === 'registro') {
                    // Redirige a una vista específica para el registro
                    window.location.href = '/auth/message';
                } else if (context === 'propiedad') {
                    // Redirige a la lista de propiedades
                    window.location.href = '/mis-propiedades';
                }
            }
        }); 
    }
}