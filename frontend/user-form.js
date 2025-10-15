document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Recolectar todos los campos del formulario
    const identificacion = document.getElementById("identificacion").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const rol = document.getElementById("rol").value;
    const status = document.getElementById("status").value;
    const password = document.getElementById("password").value;

    const data = { identificacion, nombre, apellido, telefono, email, rol, status, password };

    try {
      // Crear usuario
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Error al registrar usuario");

      // Login automático
      const loginRes = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) throw new Error(loginData.message || "Error al iniciar sesión");

      // Guardar sesión en localStorage
      localStorage.setItem("usuarioLogueado", JSON.stringify(loginData.user));

      // Mensaje y redirección
      mensaje.textContent = "Usuario creado y login automático ✅";
      mensaje.className = "exito";
      setTimeout(() => {
        window.location.href = "perfil_user.html";
      }, 1500);

      form.reset();

    } catch (err) {
      console.error(err);
      mensaje.textContent = err.message || "Error de conexión ❌";
      mensaje.className = "error";
    }
  });
});
