// login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      // Autenticação com Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
      });

      if (error) {
        alert("Erro ao efetuar login: " + error.message);
        return;
      }

      if (data.session) {
        // Login bem-sucedido, redirecionar conforme perfil
        const user = data.user;

        // Aqui você pode verificar o perfil no Supabase
        // Exemplo: tabela "profiles" com campo "role"
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profileError) {
          alert("Erro ao obter perfil: " + profileError.message);
          return;
        }

        const role = profileData.role;

        if (role === "admin") {
          window.location.href = "dashboard-admin.html";
        } else {
          window.location.href = "dashboard-usuario.html";
        }
      }

    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Erro inesperado ao tentar logar. Tente novamente.");
    }
  });
});
