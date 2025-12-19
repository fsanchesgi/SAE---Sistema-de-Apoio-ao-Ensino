document.addEventListener("DOMContentLoaded", async () => {

  // Verifica sessão ativa
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Usuário NÃO logado → volta para login
    window.location.href = "login.html";
    return;
  }

  // Usuário logado
  const userEmail = session.user.email;
  document.getElementById("userEmail").textContent =
    `Usuário autenticado: ${userEmail}`;

  // Logout
  document.getElementById("btnLogout").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  });
});
