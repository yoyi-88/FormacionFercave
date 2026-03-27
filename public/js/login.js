import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { inicializarFooter } from './utils.js';

inicializarFooter();

const form = document.querySelector('.form-login');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Intentamos entrar
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // ¡Éxito! Nos vamos al index
            window.location.href = "index.html";
        })
        .catch((error) => {
            // Si hay error (contraseña mal, usuario no existe...)
            alert("Error de autenticación");
        });
});
