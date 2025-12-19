const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });

    if (error) {
      alert("Erro ao logar: " + error.message);
      return;
    }

    // Verificar role na tabela profiles
    const { data: perfil, error: perfilError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (perfilError) {
      alert("Erro ao verificar perfil: " + perfilError.message);
      return;
    }

    if (perfil.role === "admin") {
      window.location.href = "dashboard.html"; // redireciona admin
    } else {
      window.location.href = "index.html"; // outros usuários
    }

  } catch (err) {
    console.error(err);
    alert("Erro inesperado: " + err.message);
  }
});
