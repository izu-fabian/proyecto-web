// Verificar si hay usuario guardado
const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
  // Si no hay sesión activa, redirige al login
  window.location.href = "login.html";
} else {
  // Mostrar datos
  document.getElementById("nombre").textContent = usuario.nombre;
  document.getElementById("apellido").textContent = usuario.apellido;
  document.getElementById("email").textContent = usuario.email;
  document.getElementById("telefono").textContent = usuario.telefono;
}

// Cerrar sesión
document.getElementById("cerrarSesion").addEventListener("click", () => {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
});
