import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Verificación de sesión
onAuthStateChanged(auth, async (user) => {
    if (user) {
        
        // USUARIO LOGUEADO: 
        // Pintamos su email en el header que preparamos antes
        const nombreEmpleado = document.getElementById('nombre-empleado');
        document.body.classList.add('auth-ready');

        let nombreParaMostrar = "";

        try {
            // Intentamos buscar el nombre en la bd (si existe) usando su UID
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && docSnap.data().nombre) {
                nombreParaMostrar = docSnap.data().nombre;
            } else {
            // Obtenemos el contenido previo al @ del email
            const nombreExtraido = user.email.split('@')[0];
            // Opcional para los correos que creamos para Teams
            nombreParaMostrar = nombreExtraido.replace(/fercave/i, "");
            } 
        } catch (error) {
            console.error("Error obteniendo nombre de BD:", error);
            nombreParaMostrar = user.email.split('@')[0];
        }

        if (nombreEmpleado) {
            nombreEmpleado.innerText = nombreParaMostrar;
            nombreEmpleado.style.textTransform = 'capitalize';
        }

        console.log("Usuario autenticado: ", user.email);
        
    } else {
        // USUARIO NO LOGUEADO:
        // Lo mandamos al login si intenta entrar en una página protegida
        console.warn("Acceso denegado. Redirigiendo al login...");
        window.location.href = "login.html";
    }
});

// 2. Lógica del botón "Salir" (Logout)
const btnSalir = document.querySelector('.btn-salir');
if (btnSalir) {
    btnSalir.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = "login.html";
        }).catch((error) => {
            console.error("Error al cerrar sesión:", error);
        });
    });
}