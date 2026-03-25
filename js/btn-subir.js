const btnSubir = document.getElementById("btn-subir");

// Función que comprueba la posición
const comprobarScroll = () => {
    // Si el scroll es mayor a 300px, añadimos la clase visible
    if (window.scrollY > 300) {
        btnSubir.classList.add("visible");
    } else {
        btnSubir.classList.remove("visible");
    }
};

// Escuchar el evento de scroll
window.addEventListener("scroll", comprobarScroll);

// Acción de subir al hacer clic
btnSubir.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

comprobarScroll();