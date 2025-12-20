document.addEventListener("DOMContentLoaded", async () => {

  // 🔐 Verifica sessão
  const { data: sessionData } = await window.supabase.auth.getSession();

  if (!sessionData.session) {
    window.location.href = "login.html";
    return;
  }

  const user = sessionData.session.user;
  document.getElementById("userEmail").textContent =
    `Bem-vindo, ${user.email}`;

  // 🚪 Logout
  document.getElementById("btnLogout").addEventListener("click", async () => {
    await window.supabase.auth.signOut();
    window.location.href = "login.html";
  });

  // 👤 Criar usuário
  const form = document.getElementById("formCriarUsuario");
  const msg = document.getElementById("msgStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "Criando usuário...";
    msg.style.color = "#333";

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const role = document.getElementById("role").value;

    // 1️⃣ Cria usuário no Auth
    const { data, error } = await window.supabase.auth.signUp({
      email,
      password: senha
    });

    if (error) {
      msg.textContent = error.message;
      msg.style.color = "red";
      return;
    }

    // 2️⃣ Cria perfil
    const { error: perfilError } = await window.supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        nome,
        role
      });

    if (perfilError) {
      msg.textContent = "Usuário criado, mas erro ao salvar perfil.";
      msg.style.color = "orange";
      return;
    }

    msg.textContent = "✅ Usuário criado com sucesso!";
    msg.style.color = "green";
    form.reset();
  });
});
