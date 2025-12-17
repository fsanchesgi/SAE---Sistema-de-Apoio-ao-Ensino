document.addEventListener("DOMContentLoaded", function() {
  const formLogin = document.getElementById('formLogin');

  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) { alert("Preencha todos os campos"); return; }

    try {
      const { data: loginData, error: loginError } = await supabaseClient.auth.signInWithPassword({ email, password: senha });
      if (loginError) { alert(loginError.message); return; }

      const { data: perfilData, error: perfilError } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('id', loginData.user.id)
        .single();

      if (perfilError || !perfilData) { alert("Erro ao carregar perfil"); return; }

      // Redireciona conforme role
      switch (perfilData.role) {
        case 'admin': window.location.href = 'dashboard_admin.html'; break;
        case 'professor': window.location.href = 'dashboard_professor.html'; break;
        case 'aluno': window.location.href = 'dashboard_aluno.html'; break;
        case 'pai': window.location.href = 'dashboard_pai.html'; break;
        default: alert("Perfil desconhecido");
      }
    } catch (err) {
      alert("Erro inesperado: " + err.message);
    }
  });
});
