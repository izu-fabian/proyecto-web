document.addEventListener("DOMContentLoaded", async () => {
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const profilesContainer = document.getElementById("profilesContainer");

  if (!profilesContainer) return;

  // Obtener todos los usuarios desde la API
  let usuarios = [];
  try {
    const res = await fetch("/api/users");
    usuarios = await res.json();
  } catch (err) {
    console.error("Error al cargar usuarios:", err);
  }

  // Limpiar contenedor
  profilesContainer.innerHTML = "";

  usuarios.forEach(u => {
    // No mostrar al usuario logueado
    if (usuarioLogueado && u._id === usuarioLogueado.id) return;

    const card = document.createElement("div");
    card.classList.add("user-card");

    card.innerHTML = `
      <img src="https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}" alt="Usuario" class="user-img">
      <div class="user-info">
        <h3 class="user-name">${u.nombre} ${u.apellido}</h3>
        <p class="user-specialty">${u.rol}</p>
        <div class="progress-container">
          <div class="progress-bar" style="width: 0%;"></div>
          <span class="rating">0/5</span>
        </div>
      </div>
      <button class="follow-btn">
      ${usuarioLogueado && usuarioLogueado.siguiendo?.includes(u._id.toString()) ? "Siguiendo" : "Seguir"}
      </button>
    `;

    const btn = card.querySelector(".follow-btn");

    btn.addEventListener("click", async () => {
      if (!usuarioLogueado) {
        alert("Debes iniciar sesión para seguir usuarios");
        return;
      }

      try {
        const res = await fetch(`/api/users/follow/${u._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: usuarioLogueado.id })
        });
        const data = await res.json(); 
        
        btn.textContent = data.siguiendo.includes(u._id.toString()) ? "Siguiendo" : "Seguir";

        // Actualizar usuario logueado en localStorage
        usuarioLogueado.siguiendo = data.siguiendo;
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
      } catch (err) {
        console.error("Error al seguir usuario:", err);
      }
    });

    profilesContainer.appendChild(card);
  });

  // Scroll vertical arrastrable
  let isDown = false;
  let startY;
  let scrollTop;

  profilesContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    profilesContainer.classList.add("active");
    startY = e.pageY - profilesContainer.offsetTop;
    scrollTop = profilesContainer.scrollTop;
  });

  profilesContainer.addEventListener("mouseleave", () => { isDown = false; });
  profilesContainer.addEventListener("mouseup", () => { isDown = false; });
  profilesContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y = e.pageY - profilesContainer.offsetTop;
    const walk = (y - startY) * 1.5;
    profilesContainer.scrollTop = scrollTop - walk;
  });
});
