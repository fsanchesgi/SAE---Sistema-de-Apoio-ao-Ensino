document.addEventListener("DOMContentLoaded", async () => {
  // Verifica sessão ativa
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "login.html";
    return;
  }

  // Logout
  document.getElementById("btnLogout").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  });

  // Formulário de cadastro
  const form = document.getElementById("formCadastro");
  const resultado = document.getElementById("resultadoCadastro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const role = document.getElementById("role").value;

    resultado.textContent = "Cadastrando...";

    try {
      const response = await fetch("https://vhwhjnghtmlrfieiwssi.supabase.co/functions/v1/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, role })
      });

      const data = await response.json();

      if (data.error) {
        resultado.textContent = "Erro: " + data.error;
      } else {
        resultado.textContent = "Usuário cadastrado com sucesso!";
        form.reset();
        listarUsuarios(); // Atualiza a lista de usuários
      }
    } catch (err) {
      resultado.textContent = "Erro ao conectar: " + err.message;
    }
  });

  // Listagem de usuários
  const tabelaUsuarios = document.querySelector("#tabelaUsuarios tbody");
  const filtroRole = document.getElementById("filtroRole");

  async function listarUsuarios(role = "") {
    let query = supabase.from("profiles").select("id, nome, role, email");
    if (role) query = query.eq("role", role);

    const { data, error } = await query;
    if (error) {
      console.error("Erro ao buscar usuários:", error);
      return;
    }

    tabelaUsuarios.innerHTML = "";
    data.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.nome}</td>
        <td>${user.email ?? "-"}</td>
        <td>${user.role}</td>
      `;
      tabelaUsuarios.appendChild(row);
    });
  }

  // Inicializa lista
  listarUsuarios();

  // Filtrar por role
  if (filtroRole) {
    filtroRole.addEventListener("change", () => {
      listarUsuarios(filtroRole.value);
    });
  }
});
