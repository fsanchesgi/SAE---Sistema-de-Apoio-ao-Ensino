document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!window.supabase) {
      alert("Erro: Supabase não inicializado.");
      return;
    }

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    console.log("🔐 Tentando login:", email);

    const { data, error } =
      await window.supabase.auth.signInWithPassword({
        email,
        password: senha
      });

    if (error) {
      alert("Erro ao entrar: " + error.message);
      return;
    }

    if (!data.session) {
      alert("Login realizado, mas sessão não iniciada.");
      return;
    }

    console.log("✅ Login OK");
    window.location.href = "dashboard-admin.html";
  });
});
