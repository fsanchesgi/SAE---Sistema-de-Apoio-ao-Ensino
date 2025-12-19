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

    console.log("🔐 Tentando login:", email);

    const { data, error } =
      await window.supabaseClient.auth.signInWithPassword({
        email,
        password: senha
      });

    console.log("📦 Resposta:", data, error);

    if (error) {
      alert("Erro ao entrar: " + error.message);
      return;
    }

    if (!data.session) {
      alert("Login sem sessão ativa.");
      return;
    }

    console.log("✅ Login OK, redirecionando...");
    window.location.href = "dashboard-admin.html";
  });
});
