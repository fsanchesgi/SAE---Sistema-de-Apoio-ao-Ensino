<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Dashboard Admin | SAE</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="images/logo.png" type="image/png">
</head>
<body>

<!-- HEADER PADRÃO -->
<header class="header">
  <div class="container-header">
    <div class="logo">
      <a href="index.html">
        <img src="images/logo.png" alt="SAE" height="40">
      </a>
    </div>

    <nav class="nav-left">
      <a href="#">Dashboard</a>
      <a href="#">Usuários</a>
      <a href="#">Configurações</a>
    </nav>

    <div class="nav-right">
      <button id="btnLogout" class="btn-header">Sair</button>
    </div>
  </div>
</header>

<!-- HERO DASHBOARD -->
<header class="hero hero-dashboard">
  <div class="hero-text">
    <h1>Área Administrativa</h1>
    <p>Painel de controle do Sistema de Apoio ao Ensino</p>
    <p id="userEmail" style="margin-top:10px;font-size:0.95rem;"></p>
  </div>
</header>

<!-- CONTEÚDO ADMIN -->
<section class="features">

  <!-- CARD VISÃO GERAL -->
  <div class="card show">
    <h3>Visão Geral</h3>
    <p>
      Este painel permite o gerenciamento completo da plataforma SAE,
      incluindo usuários, permissões e dados institucionais.
    </p>
  </div>

  <!-- CARD CADASTRO USUÁRIO -->
  <div class="card show">
    <h3>Cadastrar novo usuário</h3>
    <p>Crie usuários e defina o perfil de acesso.</p>

    <form id="formCreateUser" class="contact-form">
      <input type="text" id="nome" placeholder="Nome completo" required>
      <input type="email" id="email" placeholder="E-mail" required>
      <input type="password" id="senha" placeholder="Senha inicial" required>

      <select id="perfil" required>
        <option value="">Selecione o perfil</option>
        <option value="admin">Administrador</option>
        <option value="professor">Professor</option>
        <option value="aluno">Aluno</option>
        <option value="responsavel">Responsável</option>
      </select>

      <button type="submit" class="btn">Cadastrar usuário</button>
    </form>

    <p id="userCreateMsg" style="margin-top:10px;font-size:0.9rem;"></p>
  </div>

</section>

<!-- FOOTER PADRÃO -->
<footer class="footer">
  <div class="footer-bottom">
    <p>© <span id="ano-atual"></span> SAE – Sistema de Apoio Educacional.</p>
  </div>
</footer>

<!-- SUPABASE -->
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script src="supabase_client.js"></script>

<script>
document.getElementById("ano-atual").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", async () => {

  // 🔒 Proteção de sessão
  const { data: { session } } = await window.supabase.auth.getSession();

  if (!session) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userEmail").textContent =
    `Usuário autenticado: ${session.user.email}`;

  // 🚪 Logout
  document.getElementById("btnLogout").addEventListener("click", async () => {
    await window.supabase.auth.signOut();
    window.location.href = "login.html";
  });

  // 👤 Cadastro de usuário
  const form = document.getElementById("formCreateUser");
  const msg = document.getElementById("userCreateMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const perfil = document.getElementById("perfil").value;

    msg.textContent = "Criando usuário...";

    // ⚠️ IMPORTANTE
    // Esse cadastro cria usuário no AUTH
    // O perfil será salvo depois na tabela profiles
    const { data, error } = await window.supabase.auth.signUp({
      email,
      password: senha
    });

    if (error) {
      msg.textContent = "Erro: " + error.message;
      return;
    }

    msg.textContent =
      `Usuário criado com sucesso. Perfil: ${perfil}`;

    form.reset();
  });

});
</script>

</body>
</html>
