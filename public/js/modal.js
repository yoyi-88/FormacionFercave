// Obtener el modal
        var modal = document.getElementById("image-modal");

        // Obtener la imagen y su caption dentro del modal
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");

        // Obtener todas las imágenes con la clase 'img-clickable' (para que funcione con varias)
        var images = document.getElementsByClassName("img-clickable");

        // Recorrer todas las imágenes y añadir el evento 'click'
        for (var i = 0; i < images.length; i++) {
            images[i].onclick = function () {
                modal.style.display = "block"; // Mostrar el modal
                modalImg.src = this.src;       // Poner la src de la imagen clicada en el modal
                // Buscar el figcaption que está justo después de la imagen (semántica)
                var figCaption = this.nextElementSibling;
                if (figCaption && figCaption.tagName === 'FIGCAPTION') {
                    captionText.innerHTML = figCaption.innerHTML;
                } else {
                    captionText.innerHTML = this.alt; // Si no hay figcaption, usa el alt
                }
            }
        }

        // Obtener el elemento <span> que cierra el modal (la 'X')
        var span = document.getElementsByClassName("close")[0];

        // Cuando el usuario hace clic en la 'X', se cierra el modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // EXTRA: También cerrar el modal si se pulsa la tecla 'Escape'
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.style.display === "block") {
                modal.style.display = "none";
            }
        });