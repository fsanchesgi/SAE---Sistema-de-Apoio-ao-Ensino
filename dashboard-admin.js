document.addEventListener("DOMContentLoaded", async () => {
  // 🔒 Verifica sessão
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "login.html";
    return;
  }

  const userEmail = session.user.email;
  document.getElementById("userEmail").textContent = `Usuário autenticado: ${userEmail}`;

  // Logout
  document.getElementById("btnLogout").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  });

  // Criar usuário
  const formCreate = document.getElementById("formCreateUser");
  const msg = document.getElementById("createUserMsg");

  formCreate.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("newEmail").value;
    const senha = document.getElementById("newSenha").value;
    const nome = document.getElementById("newNome").value;
    const role = document.getElementById("newRole").value;

    try {
      // 1️⃣ Cria usuário no Auth
      const { data: userData, error: userError } = await supabase.auth.admin.createUser({
        email,
        password: senha
      });

      if (userError) throw userError;

      // 2️⃣ Insere perfil na tabela profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          { id: userData.user.id, nome, role }
        ]);

      if (profileError) throw profileError;

      msg.style.color = "green";
      msg.textContent = `Usuário ${nome} criado com sucesso!`;

      formCreate.reset();
    } catch (err) {
      console.error(err);
      msg.style.color = "red";
      msg.textContent = "Erro ao criar usuário: " + err.message;
    }
  });
});
