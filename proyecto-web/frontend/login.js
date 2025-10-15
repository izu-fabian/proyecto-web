document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Bienvenido, " + data.user.nombre);
      window.location.href = "index.html";
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    console.error("Error al conectar con el servidor:", err);
    alert("Error de conexión con el servidor");
  }
});
if (res.ok) {
  // Guardar datos en localStorage
  localStorage.setItem("usuario", JSON.stringify(data.user));

  // Redirigir al perfil
  window.location.href = "perfil_user.html";
}
