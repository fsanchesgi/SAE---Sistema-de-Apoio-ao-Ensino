document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!window.supabaseClient) {
      alert("Erro: Supabase não inicializado.");
      return;
    }

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const { error } =
      await window.supabaseClient.auth.signInWithPassword({
        email,
        password: senha
      });

    if (error) {
      alert("Erro ao entrar: " + error.message);
      return;
    }

    window.location.href = "dashboard-admin.html";
  });
});
