// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. OBTENER EL ID DEL CURSO DESDE LA URL
    // Buscamos el parámetro 'id' en la URL (ej: curso.html?id=veriFactu)
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('id');

    // Referencias a los contenedores principales
    const mainContent = document.getElementById('curso-card-principal');
    const errorContent = document.getElementById('curso-error');

    // 2. VERIFICAR SI EL CURSO EXISTE
    // Si no hay ID en la URL o el ID no existe en nuestra "base de datos" MIS_CURSOS
    if (!cursoId || !MIS_CURSOS[cursoId]) {
        // Mostrar mensaje de error y ocultar el contenido
        if (mainContent) mainContent.style.display = 'none';
        if (errorContent) errorContent.style.display = 'block';
        document.getElementById('page-title').innerText = "Curso no encontrado - Fercave Asesores";
        return; // Detener la ejecución del script aquí
    }

    // Si el curso existe, obtenemos sus datos
    const datosCurso = MIS_CURSOS[cursoId];

    // 3. RELLENAR LOS DATOS EN EL HTML
    
    // Título de la pestaña del navegador
    document.getElementById('page-title').innerText = datosCurso.titulo + " - Fercave Asesores";
    
    // Título principal dentro de la página
    document.getElementById('curso-titulo-principal').innerText = datosCurso.titulo;
    
    // Descripción del curso (usamos innerHTML por si quieres poner <br> o negritas en el texto)
    document.getElementById('curso-desc-texto').innerHTML = datosCurso.descripcion || "Descripción próximamente...";

    // --- Control de Vídeos ---
    
    // Parámetros recomendados para YouTube (seguridad básica y modest branding)
    const ytParams = "?controls=1&modestbranding=1&rel=0";

    // Vídeo 1
    const iframeVideo1 = document.getElementById('curso-video1');
    const containerVideo1 = document.getElementById('container-video1');
    
    if (datosCurso.video1) {
        // Si hay URL, la ponemos en el iframe sumando los parámetros
        iframeVideo1.src = datosCurso.video1 + ytParams;
        containerVideo1.style.display = 'block'; // Asegurarnos de que sea visible
    } else {
        // Si no hay URL, ocultamos el contenedor del video entero
        containerVideo1.style.display = 'none';
    }

    // Vídeo 2
    const iframeVideo2 = document.getElementById('curso-video2');
    const containerVideo2 = document.getElementById('container-video2');
    
    if (datosCurso.video2) {
        iframeVideo2.src = datosCurso.video2 + ytParams;
        containerVideo2.style.display = 'block';
    } else {
        containerVideo2.style.display = 'none';
    }

    // --- Control de Infografía ---
    const imgInfografia = document.getElementById('curso-img');
    const captionInfografia = document.getElementById('curso-img-caption');
    const sectionInfografia = document.getElementById('curso-infografia');

    if (datosCurso.infografia) {
        imgInfografia.src = datosCurso.infografia;
        // Ponemos el título del curso como texto alternativo para accesibilidad
        imgInfografia.alt = "Infografía sobre: " + datosCurso.titulo; 
        captionInfografia.innerText = "Análisis visual: " + datosCurso.titulo;
        sectionInfografia.style.display = 'block';
    } else {
        // Si no hay infografía, ocultamos la sección entera
        sectionInfografia.style.display = 'none';
    }

    // 4. MOSTRAR EL CONTENIDO FINAL
    // Una vez todo está cargado, ocultamos el posible error y mostramos la card
    if (errorContent) errorContent.style.display = 'none';
    if (mainContent) mainContent.style.display = 'flex'; // Usamos flex porque tu SCSS usa flex

});