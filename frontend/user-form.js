document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const usersList = document.getElementById("users-list");

  // Cargar usuarios existentes al entrar a la página
  async function loadUsers() {
    try {
      const res = await fetch("/api/users");
      const users = await res.json();
      usersList.innerHTML = users.map(u => `<p>${u.name} - ${u.email}</p>`).join("");
    } catch (err) {
      console.error("❌ Error al cargar usuarios:", err);
    }
  }

  // Enviar nuevo usuario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email })
        });

      const newUser = await res.json();
      usersList.innerHTML += `<p>${newUser.name} - ${newUser.email}</p>`;
      form.reset();
    } catch (err) {
      console.error("❌ Error al registrar usuario:", err);
    }
  });

  loadUsers();
});
