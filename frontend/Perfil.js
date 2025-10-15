document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const mensaje = document.getElementById("mensaje");
  const volverInicio = document.getElementById("volver-inicio");

  // Función para mostrar mensajes
  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
    mensaje.style.display = "block";
    mensaje.style.opacity = "1";

    setTimeout(() => {
      mensaje.style.opacity = "0";
      setTimeout(() => {
        mensaje.style.display = "none";
      }, 500);
    }, 3000);
  }

  // Enviar formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const text = await res.text();
      console.log("Status:", res.status);
      console.log("Response text:", text);

      if (res.status !== 200) throw new Error("Login fallido: " + text);

      const data = JSON.parse(text);

      // Guardar usuario en localStorage
      localStorage.setItem("usuarioLogueado", JSON.stringify(data.user));

      // Mostrar mensaje de éxito
      mostrarMensaje("Login correcto ✅", "exito");

      // Redirigir al perfil
      setTimeout(() => {
        window.location.href = "perfil_user.html";
      }, 1000);

    } catch (err) {
      mostrarMensaje(err.message, "error");
    }
  });

  // Botón volver al inicio
  volverInicio.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
