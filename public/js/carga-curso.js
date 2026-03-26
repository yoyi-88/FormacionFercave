import { db } from './firebase-config.js';

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('id');

    const mainContent = document.getElementById('curso-card-principal');
    const errorContent = document.getElementById('curso-error');

    // Verificar si hay ID en la URL
    if (!cursoId) {
        mostrarError(mainContent, errorContent);
        return;
    }

    try {
        // Obtener datos desde Firestore
        const docRef = doc(db, "cursos", cursoId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const datosCurso = docSnap.data();
            rellenarHTML(datosCurso, mainContent);
        } else {
            mostrarError(mainContent, errorContent);
        }
    } catch (e) {
        console.error("Error crítico al obtener el curso:", e);
        mostrarError(mainContent, errorContent);
    }
});

// Funciones de apoyo

function rellenarHTML(datosCurso, mainContent) {
    // Títulos
    document.getElementById('page-title').innerText = `${datosCurso.titulo} - Fercave Asesores S.L.`;
    document.getElementById('curso-titulo-principal').innerText = datosCurso.titulo;
    document.getElementById('curso-desc-texto').innerHTML = datosCurso.descripcion || "Descripción próximamente...";

    // Configuración de YouTube
    const ytParams = "?controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1";

    // Procesar Video 1
    const iframeVideo1 = document.getElementById('curso-video1');
    const containerVideo1 = document.getElementById('container-video1');
    procesarVideo(datosCurso.video1, iframeVideo1, containerVideo1, ytParams);

    // Procesar Video 2
    const iframeVideo2 = document.getElementById('curso-video2');
    const containerVideo2 = document.getElementById('container-video2');
    procesarVideo(datosCurso.video2, iframeVideo2, containerVideo2, ytParams);

    // Infografía
    const imgInfografia = document.getElementById('curso-img');
    const captionInfografia = document.getElementById('curso-img-caption');
    const sectionInfografia = document.getElementById('curso-infografia');

    if (datosCurso.infografia) {
        imgInfografia.src = datosCurso.infografia;
        imgInfografia.alt = `Infografía: ${datosCurso.titulo}`;
        captionInfografia.innerText = `Análisis visual: ${datosCurso.titulo}`;
        sectionInfografia.style.display = 'block';
    } else {
        sectionInfografia.style.display = 'none';
    }

    // Mostrar el contenido final
    if (mainContent) mainContent.style.display = 'flex';
}

// Función auxiliar para no repetir la lógica de YouTube dos veces
function procesarVideo(urlOriginal, iframe, contenedor, params) {
    if (urlOriginal) {
        let urlEmbed = urlOriginal;
        if (urlEmbed.includes("youtu.be/")) {
            urlEmbed = urlEmbed.replace("youtu.be/", "www.youtube.com/embed/");
        } else if (urlEmbed.includes("watch?v=")) {
            urlEmbed = urlEmbed.replace("watch?v=", "embed/");
        }
        iframe.src = urlEmbed + params;
        contenedor.style.display = 'block';
    } else {
        contenedor.style.display = 'none';
    }
}

function mostrarError(mainContent, errorContent) {
    if (mainContent) mainContent.style.display = 'none';
    if (errorContent) errorContent.style.display = 'block';
    document.getElementById('page-title').innerText = "Curso no encontrado - Fercave Asesores";
}