(function() {
    var imagenes = [];
    var indiceActual = 0;

    // Recoger todas las imágenes clickables de la página
    function inicializar() {
        var clickables = document.querySelectorAll('.img-clickable, .foto-clickable');
        imagenes = Array.from(clickables).map(function(img) { return img.src; });
    }

    function abrirLightbox(src) {
        // Mostrar la imagen directamente primero
        var img = document.querySelector('.lightbox img');
        img.src = src;
        document.querySelector('.lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';

        // Inicializar navegación
        inicializar();
        indiceActual = imagenes.indexOf(src);
        if (indiceActual === -1) indiceActual = 0;

        // Actualizar controles de navegación
        var counter = document.querySelector('.lightbox-counter');
        var prev = document.querySelector('.lightbox-prev');
        var next = document.querySelector('.lightbox-next');
        if (counter) {
            counter.textContent = (indiceActual + 1) + ' / ' + imagenes.length;
            counter.style.display = imagenes.length > 1 ? '' : 'none';
        }
        if (prev) prev.style.display = imagenes.length > 1 ? '' : 'none';
        if (next) next.style.display = imagenes.length > 1 ? '' : 'none';
    }

    function cerrarLightbox() {
        document.querySelector('.lightbox').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function mostrarImagen() {
        var img = document.querySelector('.lightbox img');
        if (imagenes[indiceActual]) {
            img.src = imagenes[indiceActual];
        }
        var counter = document.querySelector('.lightbox-counter');
        if (counter) counter.textContent = (indiceActual + 1) + ' / ' + imagenes.length;
    }

    function anterior(e) {
        e.stopPropagation();
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        mostrarImagen();
    }

    function siguiente(e) {
        e.stopPropagation();
        indiceActual = (indiceActual + 1) % imagenes.length;
        mostrarImagen();
    }

    // Teclado
    document.addEventListener('keydown', function(e) {
        if (!document.querySelector('.lightbox.active')) return;
        if (e.key === 'Escape') cerrarLightbox();
        if (e.key === 'ArrowLeft') {
            indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
            mostrarImagen();
        }
        if (e.key === 'ArrowRight') {
            indiceActual = (indiceActual + 1) % imagenes.length;
            mostrarImagen();
        }
    });

    // Exponer funciones globales
    window.abrirLightbox = abrirLightbox;
    window.cerrarLightbox = cerrarLightbox;
    window.lbAnterior = anterior;
    window.lbSiguiente = siguiente;
})();
