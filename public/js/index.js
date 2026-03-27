import { db, auth } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { inicializarFooter } from './utils.js';

onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // 1. Seleccionamos el contenedor
            const contenedor = document.querySelector('.contenedor-cursos');
            
            // 2. Ponemos el mensaje de carga ANTES de las peticiones a Firebase
            contenedor.innerHTML = '<p class="cargando">Cargando tus cursos...</p>';

            // 3. Obtener los permisos del usuario
            const userRef = doc(db, "usuarios", user.uid);
            const userSnap = await getDoc(userRef);
            
            if (!userSnap.exists()) {
                contenedor.innerHTML = '<p>No tienes cursos asignados.</p>';
                return;
            }

            const permisos = userSnap.data().cursosPermitidos || [];

            // 4. Limpiamos el "Cargando..." porque vamos a empezar a pintar las tarjetas
            contenedor.innerHTML = ""; 

            // 5. Pintar las tarjetas
            for (const cursoId of permisos) {
                const cursoRef = doc(db, "cursos", cursoId);
                const cursoSnap = await getDoc(cursoRef);

                if (cursoSnap.exists()) {
                    const curso = cursoSnap.data();
                    
                    contenedor.innerHTML += `
                        <a href="curso.html?id=${cursoId}" class="curso-card-link">
                            <div class="curso-card">
                                <div class="header-card">
                                    <img src="${curso.portada}" alt="${curso.titulo}" class="imagen-card">
                                </div>
                                <div class="body-card">
                                    <h3 class="titulo-card">${curso.titulo}</h3>
                                </div>
                            </div>
                        </a>
                    `;
                }
            }

            // Si después del bucle no hay nada (permisos vacíos o cursos borrados)
            if (contenedor.innerHTML === "") {
                contenedor.innerHTML = '<p>No hay cursos disponibles para tu perfil.</p>';
            }

        } catch (error) {
            console.error("Error cargando cursos:", error);
            const contenedor = document.querySelector('.contenedor-cursos');
            if(contenedor) contenedor.innerHTML = '<p>Hubo un error al cargar los cursos.</p>';
        }
    }
});

inicializarFooter();