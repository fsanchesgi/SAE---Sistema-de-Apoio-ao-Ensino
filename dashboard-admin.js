document.addEventListener("DOMContentLoaded", async () => {
  // Logout
  document.getElementById("btnLogout").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  });

  // Formulário de cadastro
  const form = document.getElementById("formCadastro");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const role = document.getElementById("role").value;

    const resultado = document.getElementById("resultadoCadastro");
    resultado.textContent = "Cadastrando...";

    try {
      const response = await fetch("https://vhwhjnghtmlrfieiwssi.functions.supabase.co/create-user", {
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
      }
    } catch (err) {
      resultado.textContent = "Erro ao conectar: " + err.message;
    }
  });
});
