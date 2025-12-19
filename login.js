document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  if (!window.supabaseClient) {
    alert("Erro: Supabase não inicializado.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    console.log("🔐 Tentando login com:", email);

    const { data, error } =
      await window.supabaseClient.auth.signInWithPassword({
        email,
        password: senha
      });

    console.log("📦 Retorno Supabase:", data, error);

    if (error) {
      alert("Erro ao entrar: " + error.message);
      return;
    }

    // 🔒 GARANTIA DE SESSÃO
    if (!data.session || !data.user) {
      alert("Login não autorizado. Usuário sem sessão ativa.");
      return;
    }

    console.log("✅ Login realizado com sucesso:", data.user.email);

    // REDIRECIONA
    window.location.href = "dashboard-admin.html";
  });
});
