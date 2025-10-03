const API_URL = "http://localhost:5000/api/users";

document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (res.ok) {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    loadUsers();
  } else {
    alert("Error al agregar usuario");
  }
});

async function loadUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();

  const list = document.getElementById("userList");
  list.innerHTML = "";

  users.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = `${u.name} - ${u.email}`;
    list.appendChild(li);
  });
}

loadUsers();
