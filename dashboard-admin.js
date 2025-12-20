<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>SAE | Dashboard Administrador</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<style>
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background: #f4f6f9;
  color: #1f2937;
}

/* HEADER ADMIN */
.header-admin {
  width: 100%;
  height: 64px;
  background: #0f172a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  position: relative;
  z-index: 10;
}

.header-admin h1 {
  font-size: 1.1rem;
  font-weight: bold;
}

.header-admin button {
  background: #dc2626;
  border: none;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.header-admin button:hover {
  background: #b91c1c;
}

/* CONTEÚDO */
.main-admin {
  max-width: 1100px;
  margin: 30px auto;
  padding: 0 20px;
}

/* TITULOS */
.page-title {
  margin-bottom: 6px;
  font-size: 1.8rem;
}

.page-subtitle {
  margin-bottom: 25px;
  color: #475569;
}

/* SEÇÕES */
.section {
  background: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0,0,0,.08);
  margin-bottom: 30px;
}

.section h2 {
  margin-bottom: 20px;
  font-size: 1.3rem;
}

/* FORM */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.form-grid input,
.form-grid select {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #cbd5f5;
  font-size: 0.95rem;
}

.form-grid button {
  grid-column: 1 / -1;
  max-width: 260px;
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
}

.form-grid button:hover {
  background: #1e40af;
}

.msg {
  margin-top: 15px;
  font-weight: bold;
}

/* FOOTER */
.footer-admin {
  text-align: center;
  padding: 20px;
  font-size: 0.85rem;
  color: #64748b;
}
</style>
</head>

<body>

<!-- HEADER -->
<header class="header-admin">
  <h1>SAE • Administrador</h1>
  <button id="btnLogout">Sair</button>
</header>

<!-- CONTEÚDO -->
<main class="main-admin">

  <h2 class="page-title">Bem-vindo, Administrador</h2>
  <p class="page-subtitle">
    Painel de controle do Sistema de Apoio ao Ensino
  </p>

  <!-- CADASTRO USUÁRIO -->
  <section class="section">
    <h2>Cadastrar novo usuário</h2>

    <form id="formCreateUser" class="form-grid">
      <input type="text" id="nome" placeholder="Nome completo" required>
      <input type="email" id="email" placeholder="E-mail" required>
      <input type="password" id="senha" placeholder="Senha" required>

      <select id="perfil" required>
        <option value="">Selecione o perfil</option>
        <option value="admin">Administrador</option>
        <option value="professor">Professor</option>
        <option value="aluno">Aluno</option>
      </select>

      <button type="submit">Cadastrar usuário</button>
    </form>

    <div class="msg" id="msgUser"></div>
  </section>

</main>

<footer class="footer-admin">
  SAE — Sistema de Apoio ao Ensino © <span id="ano"></span>
</footer>

<!-- SUPABASE -->
<script>
const supabaseUrl = "https://uqwbduinwugaqexsvkxc.supabase.co";
const supabaseKey = "SUA_ANON_KEY_AQUI";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("ano").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", async () => {

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "login.html";
    return;
  }

  // LOGOUT
  document.getElementById("btnLogout").onclick = async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  };

  // CADASTRO
  const form = document.getElementById("formCreateUser");
  const msg = document.getElementById("msgUser");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "Criando usuário...";

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const perfil = document.getElementById("perfil").value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha
    });

    if (error) {
      msg.textContent = error.message;
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        nome,
        perfil
      });

    if (profileError) {
      msg.textContent = "Usuário criado, erro ao salvar perfil.";
      return;
    }

    msg.textContent = "Usuário cadastrado com sucesso!";
    form.reset();
  });

});
</script>

</body>
</html>
