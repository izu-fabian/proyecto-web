document.addEventListener("DOMContentLoaded", async () => {
  const perfilContainer = document.getElementById("perfil");
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuarioLogueado) {
    // Si no hay sesión activa, redirige al login
    window.location.href = "perfil.html";
    return;
  }

  // Mostrar info básica
  document.getElementById("nombre").textContent = usuarioLogueado.nombre;
  document.getElementById("apellido").textContent = usuarioLogueado.apellido;
  document.getElementById("email").textContent = usuarioLogueado.email;
  document.getElementById("telefono").textContent = usuarioLogueado.telefono || "";

  // Crear sección de usuarios que sigue
  const siguiendoSection = document.createElement("div");
  siguiendoSection.id = "siguiendo";
  siguiendoSection.innerHTML = "<h3>Siguiendo:</h3>";
  perfilContainer.appendChild(siguiendoSection);

  // Obtener datos de todos los usuarios
  let usuarios = [];
  try {
    const res = await fetch("/api/users");
    usuarios = await res.json();
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
  }

  // Filtrar solo los que sigue el usuario
  usuarioLogueado.siguiendo = usuarioLogueado.siguiendo || [];
  usuarioLogueado.siguiendo.forEach(uid => {
    const u = usuarios.find(user => user._id === uid);
    if (!u) return;

    const card = document.createElement("div");
    card.classList.add("user-card");
    card.innerHTML = `
      <span>${u.nombre} ${u.apellido} (${u.rol})</span>
      <button class="unfollow-btn">Dejar de seguir</button>
    `;

    const btn = card.querySelector(".unfollow-btn");
    btn.addEventListener("click", async () => {
      try {
        const res = await fetch(`/api/users/follow/${u._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: usuarioLogueado.id })
        });
        const data = await res.json();
        usuarioLogueado.siguiendo = data.siguiendo;
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
        card.remove(); // quitar de la vista
      } catch (err) {
        console.error("Error al dejar de seguir:", err);
      }
    });

    siguiendoSection.appendChild(card);
  });

  // Botón cerrar sesión
  document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "perfil.html";
  });
});
