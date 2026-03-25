// Importamos solo lo que necesitamos de los servidores de Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBnh5Q--KLV8r-th5KTGcJM7GpPmv4lbys",
    authDomain: "formacion-fercave.firebaseapp.com",
    projectId: "formacion-fercave",
    storageBucket: "formacion-fercave.firebasestorage.app",
    messagingSenderId: "491872232017",
    appId: "1:491872232017:web:72ea809b6dd4c4849d4e70",
    measurementId: "G-58WGQZK8PX"
};

// Arrancamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la "llave" de autenticación para usarla en otros archivos
export const auth = getAuth(app);

// Exportamos la base de datos de Firestore
export const db = getFirestore(app);

