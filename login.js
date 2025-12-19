document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
      });

      if (error) {
        alert("Erro ao efetuar login: " + error.message);
        return;
      }

      if (data.session) {
        window.location.href = "dashboard-admin.html";
      }
    } catch (err) {
      console.error(err);
      alert("Erro inesperado. Tente novamente.");
    }
  });
});
