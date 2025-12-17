document.addEventListener("DOMContentLoaded", function() {
  const formCadastro = document.getElementById('formCadastro');

  formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const role = document.getElementById('role').value;

    if (!nome || !email || !senha || !role) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      // Criar usuário no Auth
      const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({ email, password: senha });
      if (signUpError) { alert(signUpError.message); return; }

      // Criar perfil na tabela profiles
      const { error: perfilError } = await supabaseClient.from('profiles').insert([{ id: signUpData.user.id, nome, role }]);
      if (perfilError) { alert(perfilError.message); return; }

      alert("Cadastro realizado com sucesso! Faça login agora.");
      window.location.href = 'login.html';
    } catch (err) {
      alert("Erro inesperado: " + err.message);
    }
  });
});
