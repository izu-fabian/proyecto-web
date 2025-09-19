document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");

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
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      form.reset(); // limpia el formulario
      console.log("✅ Usuario guardado correctamente");
    } catch (err) {
      console.error("❌ Error al registrar usuario:", err);
    }
  });
});
